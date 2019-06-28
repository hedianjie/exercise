module.exports = app => {
    const {router, controller} = app;

    router.get('/api/user/info', controller.user.info);
}