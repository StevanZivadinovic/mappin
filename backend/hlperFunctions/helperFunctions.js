 const handleErrors = (err,t) => {
    let error={email:'',username:'', password:'', bigError:''}

    if(err.message===t('user_not_found')){
      error.bigError=t('user_not_found')
    }
    if(err.message===t('wrong_username_or_password')){
      error.bigError=t('wrong_username_or_password')
    }
    if(err.code===11000 || err.message===t('already_in_use')){
      error.bigError=t('user_already_exist')
    }
    if (err?.message.includes('User validation failed')) {
      Object.values(err?.errors).forEach(({properties}) => {
        error[properties.path]=properties.message
      });
    }
    return error;
  };
module.exports = {handleErrors};