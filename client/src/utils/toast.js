import toast from 'react-hot-toast';

/**
 * Parse error messages and make them user-friendly
 */
const parseErrorMessage = (error) => {
    if (typeof error === 'string') return error;

    // Handle axios error responses
    if (error?.response?.data?.error) {
        const apiError = error.response.data.error;

        // Map backend errors to user-friendly messages
        const errorMap = {
            'Invalid credentials': 'Email or password is incorrect. Please try again.',
            'Account Blocked.': 'Your account has been blocked. Please contact support.',
            'User with this email already exists': 'This email is already registered. Try logging in instead.',
            'duplicate key error': 'This email is already registered. Try logging in instead.',
        };

        // Check for exact matches
        if (errorMap[apiError]) {
            return errorMap[apiError];
        }

        // Check for partial matches
        for (const [key, value] of Object.entries(errorMap)) {
            if (apiError.includes(key)) {
                return value;
            }
        }

        return apiError;
    }

    // Handle network errors
    if (error?.message === 'Network Error') {
        return 'Unable to connect. Please check your internet connection.';
    }

    // Default error message
    return 'Something went wrong. Please try again.';
};

/**
 * Show success toast with custom styling
 */
export const showSuccessToast = (message, options = {}) => {
    toast.success(message, {
        icon: options.icon || '✅',
        duration: options.duration || 4000,
        ...options,
    });
};

/**
 * Show error toast with user-friendly message
 */
export const showErrorToast = (error, options = {}) => {
    const message = parseErrorMessage(error);
    toast.error(message, {
        icon: options.icon || '❌',
        duration: options.duration || 5000,
        ...options,
    });
};

/**
 * Show warning toast
 */
export const showWarningToast = (message, options = {}) => {
    toast(message, {
        icon: options.icon || '⚠️',
        duration: options.duration || 4000,
        style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            fontWeight: '500',
        },
        ...options,
    });
};

/**
 * Show info toast
 */
export const showInfoToast = (message, options = {}) => {
    toast(message, {
        icon: options.icon || 'ℹ️',
        duration: options.duration || 4000,
        style: {
            background: '#fff',
            color: '#1f2937',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            fontWeight: '500',
        },
        ...options,
    });
};
