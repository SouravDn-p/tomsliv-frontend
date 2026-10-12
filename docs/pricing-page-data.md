# Pricing page data

`/pricing` renders `src/pages/Pricing.tsx`, which only mounts `PricingSection`. There is no subscription modal on this page. "Get Started Now" navigates to `/owner-dashboard/all-applicant` when the logged-in user is a farm owner, otherwise to `/create-account`.

The Stripe checkout dialog (`src/components/Payment/PaymentModal.tsx`) is a different screen. It opens after a farm owner creates a job, using `clientSecret` and `pricing.pricePaid` from `POST /jobs`. It does not read the pricing page.

`GET /subscription` is also unused here. The cards are a per-advert price, not the Nest subscription plan.

## What is hardcoded in the frontend

All of this lives in `src/components/Home/PricingSection/PricingSection.tsx`:

| UI | Source |
| --- | --- |
| Heading "Pay Once. Hire Fast." and the subtitle | `SectionHeading` props |
| Card titles, subtitles, footnotes | JSX strings |
| Feature bullets (both cards) | local `planDetails` array |
| Standard price `$250 / advert` | literal in JSX |

The API also returns `offerDetails.normalPrice` (250). The standard card does not use it.

## What comes from the API

`PricingSection` calls `useGetIntroductionOfferAvailabilityQuery()` from `src/redux/features/Farmowner/JobsApi.ts`.

That RTK Query endpoint is `GET /jobs/introduction-offer-availability` on `VITE_API_ENDPOINT` (`http://localhost:3000` in local dev), through `baseApi`. The route is public.

Response type: `IntroductionOfferAvailabilityResponse` in `src/redux/features/Farmowner/Jobs.type.ts`.

```json
{
  "success": true,
  "message": "Introduction offer availability checked successfully",
  "data": {
    "isAvailable": true,
    "totalLimit": 10,
    "currentCount": 0,
    "offerDetails": {
      "introductoryPrice": 150,
      "normalPrice": 250,
      "discountPercentage": 20,
      "discountUsageLimit": 3,
      "description": "The first 10 farmers..."
    }
  }
}
```

The intro card is shown only when `success` is true, `isAvailable` is true, and `currentCount < totalLimit`.

| UI | Response field |
| --- | --- |
| Intro price (`$150`) | `data.offerDetails.introductoryPrice` |
| "Exclusive for first N customers" | `data.totalLimit` |
| "spots left" | `data.totalLimit - data.currentCount` |
| Blue info line under the feature list | `data.offerDetails.description` |

`normalPrice`, `discountPercentage`, and `discountUsageLimit` are returned and ignored by this page. While the query is loading, `PricingSectionSkeleton` is shown.

## Where the backend builds that payload

`JobsController.checkIntroductionOfferAvailability` calls `JobService.checkIntroductionOfferAvailability` in `tomsliv_backend/src/main/jobs/services/job.service.ts`.

- `currentCount` is `prisma.user.count` where `isEarlyAdopter` is true.
- `isAvailable` is `currentCount < EARLY_ADOPTER_LIMIT`.
- Prices and the description string come from `PRICING_CONFIG` in `tomsliv_backend/src/main/jobs/constants/pricing.constants.ts`:

| Constant | Value |
| --- | --- |
| `NORMAL_PRICE` | 250 |
| `EARLY_ADOPTER_PRICE` | 150 |
| `EARLY_ADOPTER_DISCOUNT_PERCENTAGE` | 0.2 (sent as 20) |
| `EARLY_ADOPTER_DISCOUNT_USAGE_LIMIT` | 3 |
| `EARLY_ADOPTER_LIMIT` | 10 |

The description is assembled in the service: the first 10 farmers pay `$150` for the first advert, then 20% off the next 3 adverts.
