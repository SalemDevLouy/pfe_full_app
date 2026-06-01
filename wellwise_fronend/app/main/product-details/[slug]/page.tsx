'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useApi } from '@/lib/hooks/use-api';
import { getProductImageUrl } from '@/lib/image-utils';

// ── Star display ──────────────────────────────────────────────────────────────
function Stars({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <span className={`inline-flex gap-0.5 ${sz}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="material-symbols-outlined"
          style={{
            fontVariationSettings: i <= value ? "'FILL' 1" : "'FILL' 0",
            color: i <= value ? '#f59e0b' : '#d1d5db',
          }}
        >
          star
        </span>
      ))}
    </span>
  );
}

// ── Interactive star picker ───────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="text-2xl focus:outline-none"
          aria-label={`${i} stars`}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: i <= (hovered || value) ? "'FILL' 1" : "'FILL' 0",
              color: i <= (hovered || value) ? '#f59e0b' : '#d1d5db',
            }}
          >
            star
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const {
    getProductBySlug, getRecommendations, addToCart,
    createReview, deleteReview,
    checkWishlist, addToWishlist, removeFromWishlist,
    sessionStatus,
  } = useApi();

  const [product, setProduct]           = useState<any>(null);
  const [similar, setSimilar]           = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);
  const [quantity, setQuantity]         = useState(1);
  const [activeImage, setActiveImage]   = useState(0);

  // Wishlist
  const [liked, setLiked]               = useState(false);
  const [likeLoading, setLikeLoading]   = useState(false);

  // Reviews
  const [reviews, setReviews]           = useState<any[]>([]);
  const [userReview, setUserReview]     = useState<any>(null);
  const [showForm, setShowForm]         = useState(false);
  const [rating, setRating]             = useState(5);
  const [title, setTitle]               = useState('');
  const [comment, setComment]           = useState('');
  const [submitting, setSubmitting]     = useState(false);
  const [reviewError, setReviewError]   = useState('');

  // Cart feedback
  const [cartMsg, setCartMsg]           = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        const reviewList = data.reviews ?? [];
        setReviews(reviewList);

        if (data?.id) {
          getRecommendations(`similar/${data.id}`, 'limit=4')
            .then(r => setSimilar(r.items ?? []))
            .catch(() => {});

          if (sessionStatus === 'authenticated') {
            checkWishlist(data.id)
              .then((r: { liked: boolean }) => setLiked(r.liked))
              .catch(() => {});
          }
        }
      } catch {
        // product stays null → not found UI shown
      } finally {
        setLoading(false);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, sessionStatus]);

  // Derive user's own review (matched by presence in list after submit)
  useEffect(() => {
    setUserReview(reviews.find((r: any) => r._isOwn) ?? null);
  }, [reviews]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      setCartMsg('Added to cart!');
      setTimeout(() => setCartMsg(''), 2500);
    } catch {
      setCartMsg('Please log in first.');
      setTimeout(() => setCartMsg(''), 2500);
    }
  };

  const handleLike = async () => {
    if (sessionStatus !== 'authenticated') {
      setCartMsg('Log in to save products.');
      setTimeout(() => setCartMsg(''), 2500);
      return;
    }
    setLikeLoading(true);
    try {
      if (liked) {
        await removeFromWishlist(product.id);
        setLiked(false);
      } else {
        await addToWishlist(product.id);
        setLiked(true);
      }
    } catch {
      /* ignore */
    } finally {
      setLikeLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setReviewError('Please select a rating.'); return; }
    setSubmitting(true);
    setReviewError('');
    try {
      const newReview = await createReview(product.id, rating, title || undefined, comment || undefined);
      setReviews(prev => [{ ...newReview, _isOwn: true }, ...prev]);
      setShowForm(false);
      setTitle('');
      setComment('');
      setRating(5);
    } catch (err: any) {
      setReviewError(err.message ?? 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Delete your review?')) return;
    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      /* ignore */
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <span className="material-symbols-outlined text-stone-300 text-6xl mb-4 block">search_off</span>
        <h2 className="font-headline text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/main/store" className="text-primary font-bold hover:underline">Return to Store</Link>
      </div>
    );
  }

  // Compute image list (filter bare Cloudinary prefix rows)
  const BARE_PREFIX = 'https://cloudinary.images-iherb.com/image/upload/f_auto';
  const images = (product.images ?? []).filter((img: any) => img.url && img.url !== BARE_PREFIX);
  const mainImgUrl = getProductImageUrl(product);
  const displayImages = images.length > 0 ? images : [{ url: mainImgUrl }];

  const avgRating = product.avg_rating
    ? Math.round(product.avg_rating)
    : reviews.length > 0
      ? Math.round(reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length)
      : 0;

  const totalReviews = product._count?.reviews ?? reviews.length;

  const hasReviewed = reviews.some((r: any) => r._isOwn);

  return (
    <div className="w-full">

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all w-max">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Store
        </Link>
      </div>

      {/* ── Product hero ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-stone-50 border border-stone-100">
            <img
              src={getProductImageUrl({ images: [displayImages[activeImage]] })}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {displayImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {displayImages.slice(0, 8).map((img: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden bg-stone-50 border-2 transition-colors ${
                    activeImage === idx ? 'border-primary' : 'border-stone-100 hover:border-primary/40'
                  }`}
                >
                  <img src={getProductImageUrl({ images: [img] })} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">

          {/* Category + badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {product.categories?.[0]?.category?.name && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                {product.categories[0].category.name}
              </span>
            )}
            {product.featured && (
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                Featured
              </span>
            )}
            {product.trending && (
              <span className="px-3 py-1 bg-rose-50 text-rose-500 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                Trending
              </span>
            )}
          </div>

          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating summary */}
          <div className="flex items-center gap-3 mb-6">
            <Stars value={avgRating} />
            <span className="text-stone-500 text-sm font-medium">
              ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <div className="mb-6">
            <span className="font-headline text-4xl font-black text-on-surface">${product.price}</span>
            {product.currency && product.currency !== 'USD' && (
              <span className="text-stone-400 text-sm ml-2">{product.currency}</span>
            )}
          </div>

          <p className="text-stone-500 text-base leading-relaxed mb-8">
            {product.description || 'High-quality wellness product.'}
          </p>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.slice(0, 8).map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Cart controls */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-outline-variant/20 rounded-2xl p-1 bg-surface-container-low">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors font-bold text-lg text-stone-600"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-on-surface">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors font-bold text-lg text-stone-600"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white rounded-2xl py-4 font-bold font-label flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                Add to Cart
              </button>

              {/* Wishlist / Like */}
              <button
                type="button"
                onClick={handleLike}
                disabled={likeLoading}
                className={`p-4 border-2 rounded-2xl transition-all active:scale-95 ${
                  liked
                    ? 'border-rose-400 bg-rose-50 text-rose-500'
                    : 'border-outline-variant/20 text-stone-400 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500'
                }`}
                aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Feedback message */}
            {cartMsg && (
              <p className="text-sm font-semibold text-center text-primary animate-pulse">{cartMsg}</p>
            )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-stone-100">
            {[
              { icon: 'local_shipping', label: 'Free Shipping' },
              { icon: 'verified_user', label: '2-Year Warranty' },
              { icon: 'autorenew', label: '30-Day Return' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-stone-400 text-2xl">{icon}</span>
                <span className="text-xs font-bold text-stone-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          {product.ingredients?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-stone-100">
              <h3 className="font-headline font-bold text-on-surface mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing: string) => (
                  <span key={ing} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Reviews section ───────────────────────────────────────────────── */}
      <section className="mb-20 pt-12 border-t border-stone-100">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Customer Reviews</h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                <Stars value={avgRating} size="lg" />
                <span className="font-headline text-2xl font-black text-on-surface">{avgRating.toFixed(1)}</span>
                <span className="text-stone-500 text-sm">out of 5 · {reviews.length} reviews</span>
              </div>
            )}
          </div>
          {sessionStatus === 'authenticated' && !hasReviewed && !showForm && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-label font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-lg">rate_review</span>
              Write a Review
            </button>
          )}
          {sessionStatus !== 'authenticated' && (
            <p className="text-stone-400 text-sm font-medium">
              <Link href="/auth/signin" className="text-primary font-bold hover:underline">Log in</Link> to write a review
            </p>
          )}
        </div>

        {/* Review form */}
        {showForm && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-surface-container-low rounded-4xl p-8 mb-10 border border-outline-variant/10"
          >
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6">Your Review</h3>

            <div className="mb-5">
              <label className="block text-sm font-bold text-stone-700 mb-2">Rating *</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-stone-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Summarize your experience…"
                maxLength={120}
                className="w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-stone-400 focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-stone-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Share details about your experience with this product…"
                rows={4}
                maxLength={1000}
                className="w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-on-surface placeholder:text-stone-400 focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all resize-none"
              />
            </div>

            {reviewError && (
              <p className="text-rose-500 text-sm font-semibold mb-4">{reviewError}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-white py-3.5 rounded-xl font-label font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting
                  ? <><span className="animate-spin material-symbols-outlined text-lg">autorenew</span> Submitting…</>
                  : <><span className="material-symbols-outlined text-lg">send</span> Submit Review</>
                }
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setReviewError(''); }}
                className="px-6 py-3.5 rounded-xl border border-outline-variant/20 text-stone-500 font-bold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews list */}
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-4xl border-2 border-dashed border-stone-200">
            <span className="material-symbols-outlined text-stone-300 text-5xl mb-3 block">rate_review</span>
            <h3 className="font-headline text-xl font-bold text-on-surface">No reviews yet</h3>
            <p className="text-stone-500 mt-2 text-sm">Be the first to review this product.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className={`bg-white rounded-2xl p-6 border shadow-sm ${
                  review._isOwn ? 'border-primary/30 bg-primary/2' : 'border-stone-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-headline font-bold text-primary text-sm">
                        {(review.user?.name ?? review._isOwn ? 'You' : 'U')[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">
                        {review._isOwn ? 'You' : (review.user?.name ?? 'Anonymous')}
                      </p>
                      <p className="text-stone-400 text-xs">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Stars value={review.rating} size="sm" />
                    {review._isOwn && (
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review.id)}
                        className="ml-2 text-stone-400 hover:text-rose-500 transition-colors"
                        aria-label="Delete review"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {review.title && (
                  <h4 className="font-headline font-bold text-on-surface mt-4 mb-1">{review.title}</h4>
                )}
                {review.comment && (
                  <p className="text-stone-500 text-sm leading-relaxed mt-2">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Similar products ──────────────────────────────────────────────── */}
      {similar.length > 0 && (
        <section className="mb-20 pt-12 border-t border-stone-100">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map((p: any, i: number) => (
              <Link key={p.id} href={`/main/product-details/${p.slug}`} className="group">
                <div className="aspect-square rounded-3xl overflow-hidden bg-stone-50 mb-4 border border-stone-100">
                  <img
                    src={getProductImageUrl(p, i)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors text-sm leading-tight line-clamp-2">{p.name}</h3>
                <p className="text-primary font-bold font-label mt-1">${p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
