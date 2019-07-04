module.exports = app => {
    const {router, controller} = app;
    
    router.get('/api/user/info', controller.user.info);

    router.get('/api/creeper/search', controller.creeper.search);

    router.get('/api/creeper/pageList', controller.creeper.pageList);

    router.get('/api/creeper/content', controller.creeper.content);
}