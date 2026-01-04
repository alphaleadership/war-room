hexo.extend.helper.register('get_all_conflicts', function(){
  const conflicts = [];
  this.site.posts.forEach((post) => {
    // Exclude posts that are battles
    if (post.lat && post.lon && !post.path.startsWith('battles/')) {
      conflicts.push({
        lat: post.lat,
        lon: post.lon,
        title: post.title,
        summary: post.excerpt || post.content.substring(0, 100),
        severity: post.severity,
        path: this.url_for(post.path)
      });
    }
  });
  return conflicts;
});

hexo.extend.helper.register('get_all_news', function(){
  const news = [];
  hexo.locals.get('posts').forEach((post) => {
    if (!post.lat || !post.lon) {
      news.push({
        title: post.title,
        path: this.url_for(post.path)
      });
    }
  });
  return news;
});

hexo.extend.helper.register('minified_js', function(path) {
  const minifiedPath = path.replace(/\.js$/, '.min.js');
  return this.js(minifiedPath);
});

hexo.extend.helper.register('get_battles', function(conflictSlug) {
  const battlePath = `_posts/battles/${conflictSlug}/`;
  const battles = this.site.posts.filter(post => {
    return post.source.startsWith(battlePath);
  }).map(post => {
    return {
      lat: post.lat,
      lon: post.lon,
      title: post.title,
      description: post.content,
      path: this.url_for(post.path)
    };
  });
  return battles;
});
