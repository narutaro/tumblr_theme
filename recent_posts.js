//Tumblr 最近の投稿表示モジュール Ver.1.00
//license: LGPL 3.0
//Author: Adways Labot
//Special thanks: jQuery Boilerplate(http://jqueryboilerplate.com/)
;(function ( $, window, undefined ) {
    var pluginName = 'recentPosts',
        document = window.document,
        defaults = {
            max: 20,
            title: "Other posts"
        };
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype.init = function () {
 
        var recentPosts = $(this.element);
        recentPosts.html("");
        //var title = $('<div class="module-recent-posts-title">'+this.options.title+'</div>');
        //recentPosts.append(title);
        
        var recentPostsUl = $('<span class="Label"></span>');
        var t = this;
        $.ajax({
            type: "GET",
            url: "http://"+location.hostname+"/api/read/json",
            data: "",
            async: false,
            script: true,
            cache: false,
            success: function(_responseText){
                
                var count = 0;
                for (var i=0;i<tumblr_api_read.posts.length;i++) {
                    //var li = $('<li class="module-recent-posts-li"><a href="'+tumblr_api_read.posts[i]['url']+'">'+tumblr_api_read.posts[i]['regular-title']+'</a></li>');
                    var li = $('<a href="'+tumblr_api_read.posts[i]['url']+'">'+tumblr_api_read.posts[i]['regular-title']+'</a>');
                    recentPostsUl.append(li);
                    if (count == t.options.max) {
                        break;
                    }
                }
                recentPosts.append(recentPostsUl);
                console.log(recentPosts);
            }
         });
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
}(jQuery, window));

console.log('debug');

//$("#recent_posts").recentPosts();
