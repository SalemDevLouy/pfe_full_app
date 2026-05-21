import Link from "next/link";

export default function Store() {
  const categories = [
    { name: "All Essentials", active: true },
    { name: "Sleep Support", active: false },
    { name: "Stress Relief", active: false },
    { name: "Focus Boost", active: false },
    { name: "Nutrition", active: false },
  ];

  const productsRow1 = [
    {
      name: "Weighted Sleep Mask",
      price: "$45.00",
      insight: "Matches your sleep patterns",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu",
      badge: "Personal Match"
    },
    {
      name: "Magnesium Complex",
      price: "$32.00",
      insight: "Reduces morning cortisol",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98",
      badge: null
    },
    {
      name: "Organic Ceremonial Matcha",
      price: "$58.00",
      insight: "Supports focus goals",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a",
      badge: "Focus Pick"
    }
  ];

  const productsRow2 = [
    {
      name: "Stress-Relief Adaptogen",
      price: "$38.00",
      insight: "Balanced nervous system",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S"
    },
    {
      name: "Linen Weighted Blanket",
      price: "$185.00",
      insight: "Deepens REM cycles",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU"
    },
    {
      name: "Ambient Salt Diffuser",
      price: "$65.00",
      insight: "Evening air purification",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO"
    }
  ];

  // ── For You ────────────────────────────────────────────────────────────────
  const forYouProducts = [
    { name: "Ashwagandha KSM-66", price: "$42.00", insight: "Tailored to your stress score", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S" },
    { name: "Melatonin Micro-dose", price: "$28.00", insight: "Fits your sleep window", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu" },
    { name: "Blue-Light Glasses", price: "$75.00", insight: "Matches your screen hours", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a" },
    { name: "Lion's Mane Extract", price: "$55.00", insight: "Boosts your focus profile", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98" },
    { name: "Oat Milk Sleep Elixir", price: "$34.00", insight: "Evening ritual match", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU" },
  ];

  // ── Category Recommendations ───────────────────────────────────────────────
  const categoryRecs = [
    { name: "Sleep Support", icon: "bedtime", color: "bg-indigo-50 text-indigo-600 border-indigo-100", count: "14 items" },
    { name: "Stress Relief", icon: "self_improvement", color: "bg-green-50 text-green-600 border-green-100", count: "11 items" },
    { name: "Focus & Brain", icon: "psychology", color: "bg-amber-50 text-amber-600 border-amber-100", count: "9 items" },
    { name: "Nutrition", icon: "nutrition", color: "bg-rose-50 text-rose-600 border-rose-100", count: "18 items" },
    { name: "Movement", icon: "fitness_center", color: "bg-sky-50 text-sky-600 border-sky-100", count: "7 items" },
    { name: "Mindfulness", icon: "spa", color: "bg-purple-50 text-purple-600 border-purple-100", count: "12 items" },
  ];

  // ── Frequently Bought Together ─────────────────────────────────────────────
  const fbtSet = [
    { name: "Magnesium Complex", price: "$32.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98" },
    { name: "Weighted Sleep Mask", price: "$45.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu" },
    { name: "Ambient Salt Diffuser", price: "$65.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO" },
  ];

  // ── New Arrivals ───────────────────────────────────────────────────────────
  const newArrivals = [
    { name: "Collagen Peptides+", price: "$52.00", insight: "Trending this week", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S" },
    { name: "Reishi Night Drops", price: "$48.00", insight: "Just launched", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu" },
    { name: "Cold Exposure Kit", price: "$120.00", insight: "Editor's pick", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a" },
  ];

  // ── Goal-based Recommendations ─────────────────────────────────────────────
  const goalSections = [
    {
      goal: "Better Sleep",
      icon: "bedtime",
      tagline: "You averaged 5.8 hrs this week — let's fix that",
      products: [
        { name: "Weighted Sleep Mask", price: "$45.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu" },
        { name: "Magnesium Complex", price: "$32.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98" },
        { name: "Linen Weighted Blanket", price: "$185.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU" },
      ],
    },
    {
      goal: "Lower Stress",
      icon: "self_improvement",
      tagline: "High cortisol detected Tuesday — time to rebalance",
      products: [
        { name: "Stress-Relief Adaptogen", price: "$38.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S" },
        { name: "Ambient Salt Diffuser", price: "$65.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO" },
        { name: "Ashwagandha KSM-66", price: "$42.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98" },
      ],
    },
  ];

  // ── Similar Products ───────────────────────────────────────────────────────
  const similarProducts = [
    { name: "Hemp CBD Softgels", price: "$68.00", insight: "Similar to Adaptogen blend", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98" },
    { name: "L-Theanine Capsules", price: "$29.00", insight: "Popular with Matcha buyers", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a" },
    { name: "Silk Eye Pillow", price: "$36.00", insight: "Alternative to Sleep Mask", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu" },
    { name: "Valerian Root Extract", price: "$24.00", insight: "Works like Melatonin drops", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU" },
    { name: "Zen Aroma Roller", price: "$22.00", insight: "Pairs with the Diffuser", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO" },
  ];

  // ── Cross-sell / Upsell ────────────────────────────────────────────────────
  const upsellBundles = [
    {
      label: "Upgrade",
      tag: "Premium Pick",
      tagColor: "bg-amber-500",
      name: "Nano Magnesium Pro",
      description: "10× higher bioavailability than standard Mg",
      price: "$78.00",
      originalPrice: "$32.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98",
    },
    {
      label: "Complete your routine",
      tag: "Bundle & Save 15%",
      tagColor: "bg-primary",
      name: "Sleep Ritual Bundle",
      description: "Sleep Mask + Magnesium + Salt Diffuser",
      price: "$119.00",
      originalPrice: "$142.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu",
    },
    {
      label: "Add-on",
      tag: "Pairs Well",
      tagColor: "bg-green-500",
      name: "Lavender Pillow Mist",
      description: "Enhances your weighted blanket experience",
      price: "$18.00",
      originalPrice: null,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-6 mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
             Curated for Your <span className="text-primary">Rhythms</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
             Every selection here is calibrated to your recent AI wellness analysis. We've prioritized items that support your current focus goals and evening deceleration.
          </p>
        </div>
        <div className="flex-1 w-full h-80 rounded-[2rem] overflow-hidden wellness-glow">
          <img alt="Serene wellness space" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDND3DiMQEjSKr2xlA3lBMvtzfo-0EN7EEgyI4a65j40CD_QAzUqMuRboeNO4wEyYJeVa2hmnD1sIZX8yoVDpEshS1eCsA6mHzKXypOF9Bw9sTTaaTSbnNTYvj3vGmvmt1XByEpuaBJ8wRrBRVWWPQFjGd-cdtAsWa1U_ksW07mHlIW9ywgjjeLbt4x55eL0QTbOWjoklU2M733vEpOFjg_JrQCsvdti95dA-sk65iYIWiX0KMtkTCxLqANA8mfdCEVuyOGHFznr7ic"/>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-stone-400 text-xl">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Search for supplements, wellness gear, or goals..." 
            className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-[1.5rem] font-medium text-on-surface placeholder:text-stone-400 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none shadow-sm transition-all hover:border-primary/20 hover:bg-surface-container-lowest"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-8 py-3 rounded-full font-label text-sm uppercase tracking-widest font-semibold transition-all ${
                cat.active
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-stone-500 hover:bg-surface-container-highest'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid - Row 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {productsRow1.map((item, i) => (
          <Link key={i} href="/main/product-details" className="group block">
             <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
                {item.badge && (
                  <div className="absolute top-4 left-4">
                     <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.badge}</span>
                  </div>
                )}
             </div>
             <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                   <h3 className="font-headline text-xl font-bold text-on-surface">{item.name}</h3>
                   <span className="text-primary font-bold font-label">{item.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                   {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                   <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                   Add to Bag
                </button>
             </div>
             </Link>
        ))}
      </section>

      {/* AI Insight Banner */}
      <section className="my-20">
        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 wellness-glow relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
           <div className="p-4 bg-primary/10 rounded-2xl shrink-0 z-10">
              <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
           </div>
           <div className="flex-1 space-y-3 z-10">
              <h4 className="font-headline text-2xl font-bold text-on-surface">Curated by AI Insight</h4>
              <p className="text-stone-600 font-medium leading-relaxed">Your stress levels were peak on Tuesday; we recommend these calming adaptogens to balance your nervous system before your next heavy work cycle.</p>
           </div>
           <button className="bg-primary text-white px-8 py-4 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform whitespace-nowrap shadow-lg shadow-primary/30 z-10">Explore Calming</button>
        </div>
      </section>

      {/* Product Grid - Row 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {productsRow2.map((item, i) => (
            <Link key={i} href="/main/product-details" className="group block">
             <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
             </div>
             <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                   <h3 className="font-headline text-xl font-bold text-on-surface">{item.name}</h3>
                   <span className="text-primary font-bold font-label">{item.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                   {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                   <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                   Add to Bag
                </button>
             </div>
             </Link>
        ))}
      </section>

      {/* ── 1. Personalized Recommendations — For You ──────────────────────── */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">AI Personalised</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">For You</h2>
          </div>
          <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
            See all <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {forYouProducts.map((item, i) => (
            <Link key={i} href="/main/product-details" className="group shrink-0 w-52">
              <div className="aspect-[3/4] bg-surface-container-low rounded-2xl overflow-hidden relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">For You</span>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-headline text-base font-bold text-on-surface leading-tight">{item.name}</p>
                <p className="text-primary/80 text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>{item.insight}
                </p>
                <p className="text-primary font-bold font-label text-sm">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 2. Categories Recommendation ──────────────────────────────────── */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>grid_view</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Browse by Need</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Categories for You</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryRecs.map((cat, i) => (
            <button key={i} className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${cat.color} hover:scale-[1.03] transition-transform active:scale-95`}>
              <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>{cat.icon}</span>
              <span className="font-headline font-bold text-sm text-center leading-tight">{cat.name}</span>
              <span className="text-[11px] opacity-70 font-label">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. Frequently Bought Together ─────────────────────────────────── */}
      <section className="mt-24">
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>shopping_cart</span>
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">People Also Buy</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface">Frequently Bought Together</h2>
        </div>
        <div className="bg-surface-container-low rounded-[2rem] p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8">
            {fbtSet.map((item, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-6 flex-1 w-full">
                <Link href="/main/product-details" className="group flex items-center gap-4 flex-1">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface leading-tight">{item.name}</p>
                    <p className="text-primary font-bold font-label text-sm mt-1">{item.price}</p>
                  </div>
                </Link>
                {i < fbtSet.length - 1 && (
                  <span className="shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-stone-500 font-bold text-lg">+</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-stone-600 font-medium">
              Total: <span className="text-on-surface font-bold font-headline text-xl ml-1">$142.00</span>
            </div>
            <button className="sm:ml-auto bg-primary text-white px-8 py-3.5 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform shadow-lg shadow-primary/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
              Add All 3 to Bag
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. New Arrivals ────────────────────────────────────────────────── */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>new_releases</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Just Landed</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">New Arrivals</h2>
          </div>
          <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
            See all <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((item, i) => (
            <Link key={i} href="/main/product-details" className="group block">
              <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">New</span>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-xl font-bold text-on-surface">{item.name}</h3>
                  <span className="text-primary font-bold font-label">{item.price}</span>
                </div>
                <p className="text-stone-500 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  Add to Bag
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. Goal-based Recommendations ─────────────────────────────────── */}
      <section className="mt-24 space-y-16">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>flag</span>
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Tailored to Your Goals</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface">Shop by Goal</h2>
        </div>
        {goalSections.map((section, si) => (
          <div key={si}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>{section.icon}</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-on-surface">{section.goal}</h3>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  {section.tagline}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.products.map((item, pi) => (
                <Link key={pi} href="/main/product-details" className="group flex gap-5 p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container-highest transition-colors">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} />
                  </div>
                  <div className="flex-1 space-y-1.5 py-1">
                    <p className="font-headline font-bold text-on-surface leading-tight">{item.name}</p>
                    <p className="text-primary font-bold font-label text-sm">{item.price}</p>
                    <button className="w-full bg-white border border-outline-variant/15 py-2 rounded-lg font-label text-xs tracking-wide text-stone-500 hover:bg-primary hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-1.5 font-bold active:scale-95">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── 6. Similar Products ────────────────────────────────────────────── */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>compare</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">You May Also Like</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Similar Products</h2>
          </div>
          <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
            See all <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {similarProducts.map((item, i) => (
            <Link key={i} href="/main/product-details" className="group shrink-0 w-52">
              <div className="aspect-[3/4] bg-surface-container-low rounded-2xl overflow-hidden">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
              </div>
              <div className="mt-3 space-y-1">
                <p className="font-headline text-base font-bold text-on-surface leading-tight">{item.name}</p>
                <p className="text-stone-500 text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">compare_arrows</span>{item.insight}
                </p>
                <p className="text-primary font-bold font-label text-sm">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 7. Cross-sell / Upsell ─────────────────────────────────────────── */}
      <section className="mt-24 mb-8">
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>upgrade</span>
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Enhance Your Order</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface">Complete Your Routine</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upsellBundles.map((item, i) => (
            <div key={i} className="bg-surface-container-low rounded-[1.5rem] overflow-hidden group hover:bg-surface-container-highest transition-colors">
              <div className="aspect-video overflow-hidden relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
                <div className="absolute top-3 left-3">
                  <span className={`${item.tagColor} text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest`}>{item.tag}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest font-label">{item.label}</p>
                <h3 className="font-headline text-lg font-bold text-on-surface leading-tight">{item.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary font-bold font-label text-lg">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-stone-400 line-through text-sm font-label">{item.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:scale-[0.97] transition-transform shadow-md shadow-primary/20 flex items-center gap-1.5 active:scale-95">
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. View All Products ───────────────────────────────────────────── */}
      <section className="mt-16 mb-24 flex justify-center">
        <Link href="/main/store/all-products" className="group flex items-center gap-3 bg-white border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-label text-sm tracking-widest uppercase font-bold hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95">
          <span>Explore All Products</span>
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      </section>

      {/* Floating Action Button (Cart) */}
      <div className="fixed bottom-12 right-12 z-50 hidden md:block">
         <Link href="/main/cart" className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center group hover:bg-primary transition-all duration-300 active:scale-95 border border-outline-variant/10 relative">
            <span className="material-symbols-outlined text-stone-600 group-hover:text-white text-3xl transition-colors">shopping_bag</span>
            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></span>
         </Link>
      </div>
    </div>
  )
}
