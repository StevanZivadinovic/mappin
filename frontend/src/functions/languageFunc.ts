
// Example function to set the language on the backend
export const setLanguageOnBackend = (language) => {
  fetch('/set_language', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ language }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to set language');
      }
      // Language set successfully
      console.log('Language set successfully');
    })
    .catch(error => {
      // Handle error
      console.error('Error setting language:', error);
    });
};
