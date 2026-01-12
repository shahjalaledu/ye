/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hacks_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hacks_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__hacks_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__like_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__like_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__like_js__);



// import Vue from 'vue';
// import PostLike from './components/Like.vue';

// new Vue({
//     el: '#trickbd-app',
//     components: {

//     }
// });
//

/***/ }),
/* 2 */
/***/ (function(module, exports) {

jQuery(document).ready(function ($) {

    $("li.search a").click(function () {
        $(this).closest('li.search').find("input").fadeToggle(200);
        return false;
    });

    $("a.m_search i").click(function () {
        $("div.mob_search").toggleClass('sp_flex');
        $(this).toggleClass('fa-times');
        return false;
    });

    $(".search_login.s2 > a").click(function () {
        $(this).siblings('ul.mob_prfile').slideToggle(400);
        return false;
    });

    $(".main_slider .slider").owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        autoplayTimeout: 3000,
        nav: false
    });

    $(".menu-item-has-children > a").after("<i class=\"naaai fa fa-angle-up fa-angle-down\"></i>");

    $(".l_hot a").click(function () {
        $(this).closest('.side_posts').removeClass('s_popular');
        return false;
    });

    $(".l_popular a").click(function () {
        $(this).closest('.side_posts').addClass('s_popular');
        return false;
    });

    $(".cats ul li a i").click(function () {
        $(this).closest('.list_cats').find("ul").slideToggle(200);
        return false;
    });

    var lastScrollTop = 0;

    $(window).scroll(function () {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 70) {
            // downscroll code
            $("header .mid").addClass('scroll_funcs');
        } else {
            // upscroll code
            $("header .mid").removeClass('scroll_funcs');
        }
        lastScrollTop = st;
    });

    $("a.menu_toggle").click(function () {
        $("header .m_menu").toggleClass('menu_showw');
        return false;
    });

    $("header .m_menu ul li.menu-item-has-children > a").before("<i class=\"naaai fa fa-angle-up fa-angle-down\"></i>");
    $("header .m_menu ul li.menu-item-has-children > i.naaai").click(function () {
        $(this).closest('li.menu-item-has-children').toggleClass('show_sub').siblings('li.menu-item-has-children').removeClass('show_sub');
    });

    $(window).scroll(function () {
        scrtop = $(document).scrollTop();
        if (scrtop > 320) {
            $("a.scroll_top").fadeIn(200);
        } else {
            $("a.scroll_top").fadeOut(10);
        }
    });

    $("a.scroll_top").click(function () {
        $("html").animate({
            "scrollTop": 0
        }, 400);
        $("body").animate({
            "scrollTop": 0
        }, 400);
        return false;
    });

    wwwww = $("html").width();
    if (wwwww <= 980) {
        $(".single_main > .mid").addClass('col_2 sidebar');
        var cnt1 = $(".single_main > .mid > .col_2").contents();
        $(".single_main > .mid > .col_2").replaceWith(cnt1);
        var cnt2 = $(".single_main > .mid > .sidebar").contents();
        $(".single_main > .mid > .sidebar").replaceWith(cnt2);
    }

    // if (wwwww >= 850) {

    //     $(".col_2.posts .featured_post > .box").removeClass("box");

    // }

    // $(window).resize(function(){
    //   wwwww = $("html").width();
    //   if (wwwww <= 980) {
    //     $(".single_main > .mid").addClass('col_2 sidebar');
    //     var cnt1 = $(".single_main > .mid > .col_2").contents();
    //     $(".single_main > .mid > .col_2").replaceWith(cnt1);
    //     var cnt2 = $(".single_main > .mid > .sidebar").contents();
    //     $(".single_main > .mid > .sidebar").replaceWith(cnt2);
    //   }
    // });
    // Select all links with hashes
    //
    //

    // @todo: ??
    // $('a[href*="#"]').click(function(event) {
    //     // On-page links
    //     // Figure out element to scroll to
    //     var target = $(this.hash);
    //     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //     // Does a scroll target exist?
    //     if (target.length) {
    //         // Only prevent default if animation is actually gonna happen
    //         event.preventDefault();
    //         $('html, body').animate({
    //             scrollTop: target.offset().top
    //         }, 200, function() {
    //             // Callback after animation
    //             // Must change focus!
    //             var $target = $(target);
    //             $target.focus();
    //             if ($target.is(":focus")) { // Checking if the target was focused
    //                 return false;
    //             } else {
    //                 $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
    //                 $target.focus(); // Set focus again
    //             };
    //         });
    //     }
    // });

});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrickBD_Like = function () {
    function TrickBD_Like() {
        _classCallCheck(this, TrickBD_Like);

        var self = this;

        jQuery('.trickbd-like-count').on('click', function (e) {

            e.preventDefault();

            if (!trickbd.is_logged) {
                window.location = trickbd.login_url;
                return;
            }

            var $this = jQuery(this);
            var post_id = $this.attr('data-id');
            var current_like = self.get_like($this);

            if ($this.hasClass('liked')) {
                self.unlike($this, post_id, current_like);
            } else {
                self.like($this, post_id, current_like);
            }
        });
    }

    _createClass(TrickBD_Like, [{
        key: 'like',
        value: function like($this, post_id, current_like) {
            this.update_like(post_id, ++current_like, true);
            this.send_like_request(post_id);
        }
    }, {
        key: 'unlike',
        value: function unlike($this, post_id, current_like) {
            this.update_like(post_id, --current_like, false);
            this.send_like_request(post_id);
        }
    }, {
        key: 'send_like_request',
        value: function send_like_request(post_id) {

            var self = this;

            jQuery.get(trickbd.ajaxurl, {
                action: 'trickbd_like',
                post_id: post_id
            }, function (data) {

                if (data.data != undefined && data.data.likes != undefined) {
                    var is_like = data.data.did == 'like' ? true : false;
                    self.update_like(post_id, data.data.likes, is_like);
                }
            });
        }
    }, {
        key: 'update_like',
        value: function update_like(post_id, like) {
            var is_like = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            $likes = jQuery('.trickbd-like-count[data-id=' + post_id + ']');

            $likes.find('span').text(like);

            if (is_like) {
                $likes.addClass('liked');
            } else {
                $likes.removeClass('liked');
            }
        }
    }, {
        key: 'get_like',
        value: function get_like($this) {
            return parseInt($this.find('span').text());
        }
    }]);

    return TrickBD_Like;
}();

new TrickBD_Like();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);