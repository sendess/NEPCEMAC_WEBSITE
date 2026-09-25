/**
 * Headline figures on the home page (the admin panel can change them once the database is connected).
 * Years of work are counted from the founding date, so they are not listed here.
 */
export type Figures = {
  /** Households served by the waste programmes NEPCEMAC set up. */
  families: number;
  /** People trained or reached by awareness programmes. */
  trained: number;
  /** Municipalities worked in. */
  cities: number;
};

export const figures: Figures = { families: 50000, trained: 33000, cities: 5 };
