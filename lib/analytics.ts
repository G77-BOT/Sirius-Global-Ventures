// Analytics configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Pageview tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Event tracking
type EventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export const event = ({ action, category, label, value, ...rest }: EventParams) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// Common events
export const trackButtonClick = (buttonName: string, location?: string) => {
  event({
    action: 'button_click',
    category: 'Engagement',
    label: buttonName,
    location: location || window.location.pathname,
  });};

export const trackFormSubmission = (formName: string, status: 'success' | 'error' = 'success') => {
  event({
    action: 'form_submit',
    category: 'Engagement',
    label: formName,
    status: status,
    location: window.location.pathname,
  });
};

export const trackLinkClick = (linkText: string, destination: string) => {
  event({
    action: 'link_click',
    category: 'Navigation',
    label: linkText,
    destination: destination,
    location: window.location.pathname,
  });
};
