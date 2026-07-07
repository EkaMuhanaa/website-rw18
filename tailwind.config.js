import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                "outline": "#6e7881",
                "on-primary": "#ffffff",
                "on-tertiary-fixed": "#2c1600",
                "on-tertiary-container": "#4d2b00",
                "text-primary": "#1E293B",
                "outline-variant": "#bec8d2",
                "background": "#f6faff",
                "error-container": "#ffdad6",
                "inverse-surface": "#2c3135",
                "on-tertiary": "#ffffff",
                "surface-container-highest": "#dee3e9",
                "primary": "#006591",
                "secondary-fixed": "#cce5ff",
                "primary-fixed": "#c9e6ff",
                "tertiary-container": "#de8712",
                "surface-container-low": "#f0f4fa",
                "surface-dim": "#d6dae0",
                "primary-container": "#0ea5e9",
                "surface-container-high": "#e4e8ee",
                "on-primary-fixed": "#001e2f",
                "on-tertiary-fixed-variant": "#693c00",
                "tertiary-fixed-dim": "#ffb86e",
                "on-secondary": "#ffffff",
                "surface": "#F8F9FA",
                "on-surface-variant": "#3e4850",
                "secondary-container": "#5bb8fe",
                "on-primary-container": "#003751",
                "surface-tint": "#006591",
                "secondary": "#006398",
                "inverse-primary": "#89ceff",
                "tertiary": "#8a5100",
                "on-secondary-fixed": "#001d31",
                "warning": "#F59E0B",
                "surface-container-lowest": "#ffffff",
                "on-error": "#ffffff",
                "tertiary-fixed": "#ffdcbd",
                "surface-container": "#eaeef4",
                "on-surface": "#171c20",
                "on-primary-fixed-variant": "#004c6e",
                "error": "#ba1a1a",
                "primary-fixed-dim": "#89ceff",
                "on-secondary-container": "#00476e",
                "on-error-container": "#93000a",
                "surface-bright": "#f6faff",
                "on-secondary-fixed-variant": "#004b73",
                "secondary-fixed-dim": "#93ccff",
                "inverse-on-surface": "#edf1f7",
                "on-background": "#171c20",
                "surface-variant": "#dee3e9"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "margin-page": "2rem",
                "stack-sm": "0.5rem",
                "stack-md": "1rem",
                "stack-lg": "2rem",
                "gutter-grid": "1.5rem"
            },
            fontFamily: {
                "body-lg": ["Inter", ...defaultTheme.fontFamily.sans],
                "headline-sm": ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
                "headline-md": ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
                "body-md": ["Inter", ...defaultTheme.fontFamily.sans],
                "body-sm": ["Inter", ...defaultTheme.fontFamily.sans],
                "headline-lg": ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
                "label-md": ["Inter", ...defaultTheme.fontFamily.sans],
                "sans": ["Inter", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "headline-sm": ["20px", { "lineHeight": "1.4", "fontWeight": "600" }],
                "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "headline-lg": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
                "label-md": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }]
            }
        },
    },

    plugins: [forms],
};
