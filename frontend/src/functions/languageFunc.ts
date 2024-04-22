
export const setLanguageOnBackend = (language:string) => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/set_language`, {
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
      console.log('Language set successfully');
    })
    .catch(error => {
      console.error('Error setting language:', error);
    });
};
