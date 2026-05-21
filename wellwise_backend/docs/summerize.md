أدناه ملخص موجز بكل الـ endpoints التي جربناها: المسار، الطريقة، هل يلزم توثيق (Bearer token)، جسم الطلب النموذجي، ونوع الاستجابة المتوقعة.

**ملاحظة عامة**
- كل المسارات تعمل خلف البادئة العامة: `api/v1` → مثال كامل: `POST /api/v1/auth/login`.
- لجميع مسارات المستخدم يجب إرسال هدر: `Authorization: Bearer <accessToken>` (التوكن يُستخرج من `register`/`login`).

**Auth**
- **POST /api/v1/auth/register**: إنشاء مستخدم جديد.  
  - Body: `{"name","email","password", "age?", "gender?"}`  
  - Resp: `201 Created` مع `{ accessToken, user }`.
- **POST /api/v1/auth/login**: تسجيل دخول.  
  - Body: `{"email","password"}`  
  - Resp: `200` مع `{ accessToken, user }`.
- **GET /api/v1/auth/profile**: جلب بيانات المستخدم من التوكن.  
  - Header: `Authorization`  
  - Resp: `200` مع بيانات المستخدم.
  
**Profile**
- **GET /api/v1/user/profile**: جلب بروفايل المستخدم.  
  - Auth: مطلوب. Resp: `200` مع بيانات المستخدم.
- **PUT /api/v1/user/profile**: تحديث الاسم/العمر/الجنس.  
  - Body: `{"name"?, "age"?, "gender"?}`  
  - Resp: `200` مع الحقول المحدثة.
- **PUT /api/v1/user/profile/password**: تغيير كلمة المرور.  
  - Body: مطابق لـ `ChangePasswordDto` (كلمة المرور القديمة والجديدة). Resp: `200`.
- **DELETE /api/v1/user/profile**: حذف الحساب. Auth: مطلوب.

**Health Profile**
- **GET /api/v1/user/health-profile**: جلب ملف الصحة للمستخدم. Resp: `200`.
- **PUT /api/v1/user/health-profile**: إنشاء/تعديل ملف الصحة.  
  - Body: `UpdateHealthProfileDto` (حقول الصحة مثل `weightKg`, `heightCm`, ...)  
  - Resp: `200` أو `201` حسب التنفيذ.
- **GET /api/v1/user/health-profile/goals**: قائمة الأهداف الصحية. Resp: `200` (قائمة).
- **POST /api/v1/user/health-profile/goals**: إنشاء هدف صحي.  
  - Body: `{"title":"Run 5k","targetValue":"5","unit":"km"}`  
  - Resp: `201` مع الهدف المنشأ.
- **PATCH /api/v1/user/health-profile/goals/:goalId**: تحديث هدف.  
  - Body: `UpdateHealthGoalDto`  
  - Resp: `200`.
- **GET /api/v1/user/health-profile/preferences**: جلب تفضيلات الصحة (قائمة). Resp: `200`.
- **PUT /api/v1/user/health-profile/preferences**: upsert تفضيلات.  
  - Body: `{"preferences":[{"key":"diet","value":"vegan"}, ...]}`  
  - Resp: `200` مع التفضيلات المحدثة.

**Assessments**
- **POST /api/v1/user/assessments**: إنشاء تقييم (assessment).  
  - Body: `{"type":"ONBOARDING"|"WEEKLY"|"CUSTOM","notes"?: "..."}`
  - Resp: `201` مع `id` التقييم (حالة DRAFT).
- **POST /api/v1/user/assessments/:assessmentId/submit**: إرسال إجابات التقييم.  
  - Body: `{"notes"?: "...", "answers":[{questionKey, questionLabel, answer, score?}, ...]}`  
  - Resp: `201` مع التقييم المرسَل وحقل `answers`.
- **GET /api/v1/user/assessments**: تاريخ/قائمة التقييمات. Resp: `200`.
- **GET /api/v1/user/assessments/:assessmentId**: جلب تقييم حسب الـ id. Resp: `200`.

**Cart**
- **GET /api/v1/user/cart**: جلب سلة المستخدم (items + subtotal). Resp: `200`.
- **POST /api/v1/user/cart/items**: إضافة عنصر للسلة.  
  - Body: `{"productId":"<id>","quantity":1}`  
  - Resp: `200` مع السلة المحدثة. (إذا المنتج غير موجود → خطأ / NotFound).
- **PATCH /api/v1/user/cart/items/:itemId**: تعديل كمية عنصر.  
  - Body: `{"quantity":2}`  
  - Resp: `200`.
- **DELETE /api/v1/user/cart/items/:itemId**: حذف عنصر من السلة. Resp: `200`.
- **POST /api/v1/user/cart/checkout**: تحويل سلة إلى طلب (order).  
  - Body: `{"shippingAddress"?, "billingAddress"?, "shippingAmount"?, "taxAmount"?}`  
  - Resp: `200`/`201` مع تفاصيل الطلب؛ إذا السلة فارغة → `400 Cart is empty`.

**Orders**
- **GET /api/v1/user/orders**: قائمة طلبات المستخدم (يمكن فلترتها بالـ query مثل `?status=PAID`). Resp: `200`.
- **GET /api/v1/user/orders/:orderId**: جلب طلب محدد. Resp: `200`.
- **PATCH /api/v1/user/orders/:orderId/cancel**: إلغاء طلب.  
  - Body: `{"reason"?: "..."}`  
  - Resp: `200` أو خطأ إذا الطلب غير موجود.

**Reviews**
- **GET /api/v1/user/reviews**: قائمة مراجعات المستخدم. Resp: `200`.
- **GET /api/v1/user/reviews/:reviewId**: جلب مراجعة. Resp: `200`.
- **POST /api/v1/user/reviews**: إنشاء مراجعة لمنتج.  
  - Body: `{"productId":"<id>","rating":1-5,"title"?, "comment"?"}`  
  - Resp: `201` مع المراجعة؛ إذا المنتج غير موجود → NotFound.
- **PUT /api/v1/user/reviews/:reviewId**: تعديل مراجعة. Body مشابه لـ `UpdateReviewDto`. Resp: `200`.
- **DELETE /api/v1/user/reviews/:reviewId**: حذف مراجعة. Resp: `200` (رسالة تأكيد).

أمثلة curl مختصرة (استبدل `<TOKEN>` و`<ID>` حيث يلزم):
- تسجيل/حصول توكن:
  - curl -X POST -H "Content-Type: application/json" -d '{"name":"Test","email":"a@b.com","password":"pass"}' http://localhost:3000/api/v1/auth/register
- جلب البروفايل:
  - curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/api/v1/user/profile
- إنشاء هدف صحي:
  - curl -X POST -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"title":"Run 5k","targetValue":"5","unit":"km"}' http://localhost:3000/api/v1/user/health-profile/goals
- إنشاء تقييم وإرساله:
  - curl -X POST -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"type":"ONBOARDING","notes":"..."}' http://localhost:3000/api/v1/user/assessments
  - curl -X POST -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"answers":[{"questionKey":"q1","questionLabel":"Q1","answer":"yes","score":1}]}' http://localhost:3000/api/v1/user/assessments/<ID>/submit
- إضافة للـ cart (يتطلب وجود `product` صالح في DB):
  - curl -X POST -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"productId":"<PRODUCT_ID>","quantity":1}' http://localhost:3000/api/v1/user/cart/items
- إنشاء مراجعة (يتطلب `productId` صالح):
  - curl -X POST -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"productId":"<PRODUCT_ID>","rating":5,"title":"Great"}' http://localhost:3000/api/v1/user/reviews

إذا تريد، أقدر الآن:
- أنشئ لك منتج اختبار في قاعدة البيانات ثم أجرب `cart`/`checkout` و`reviews` end-to-end، أو
- أصدّر ملف سكربت يحتوي كل أوامر `curl` التي استخدمناها لتكرار الاختبارات محلياً. أيهما تفضل؟