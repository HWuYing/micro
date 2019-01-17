const interceptor = ['/login', '/user/login', '/index.json'];

export const beforeInterceptor = async (req, res, next) => {
  const { headers: { token = '' } = {}, path, method } = req;
  // console.log('=====interceptor=====');
  // console.log('token ===>', token);
  // console.log(path, method);
  if (interceptor.includes(path)) next();
  // else if (!token) res.redirect('/login');
  else next();
};

export const afterInterceptor = async (obj, req, res, next) => {
  try {
    if (obj && obj.$promise) {
      const result = await obj.$promise;
      const { resultCode } = result;
      if (resultCode) res.json(result);
      else next(result);
    } else next(obj);
  } catch (e) {
    next(e);
  }
};
