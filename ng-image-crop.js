angular.module('ngImageCrop', []).directive('ngImageCrop', function () {
  return {
    template: "<img id=image-crop-{{rand}} src='{{imageSrc}}' class='image-crop'></img>",
    replace: true,
    restrict: 'AE',
    scope: {
      imageSrc: '@',
      x: '@',
      y: '@',
      x2: '@',
      y2: '@',
      minWidth: '@',
      minHeight: '@',
      boxWidth: '@',
      boxHeight: '@',
      result: '=',
      loading: '='
    },
    link: function (scope, element, attributes) {
      var showCoords;
      scope.rand = Math.round(Math.random() * 99999);
      showCoords = function (c) {
        scope.result.x = c.x;
        scope.result.y = c.y;
        scope.result.x2 = c.x2;
        scope.result.y2 = c.y2;
        scope.result.w = c.w;
        scope.result.h = c.h;
        return scope.$apply();
      };

      $('.image-crop').load(function () {
        scope.loading = false;
      });

      return element.Jcrop({
        onChange: showCoords,
        minSize: [scope.minWidth, scope.minHeight],
        boxWidth: scope.boxWidth,
        boxHeight: scope.boxHeight,
        allowSelect: false,
        aspectRatio: scope.minWidth / scope.minHeight
      }, function () {
        var jcrop_api;
        jcrop_api = this;
        return jcrop_api.animateTo([scope.x, scope.y, scope.x2, scope.y2]);
      });
    }
  };
});
