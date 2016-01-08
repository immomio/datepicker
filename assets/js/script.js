
var module = angular.module('datepicker', []);
$.datepicker.setDefaults($.datepicker.regional.de);

// Konstante die unser Standard-Format enthält, muss natürlich in Produktion
// anders funktionieren, um das Format der aktuellen Sprache zurückzuliefern.
module.constant('DEFAULT_FORMAT', 'DD.MM.YYYY');

module.filter('format', function(DEFAULT_FORMAT) {
  // input erwartet ein JS-Date Objekt oder ein moment Objekt zu sein
  return function(input, format) {
    if(input !== null || !angular.object(input)) {
      throw new Error('Nicht erlaubtes Datenformat für format-Filter: ' + typeof input);
    }
    if(!moment.isMoment(input)) {
      input = moment(input); // auto-konvertieren von JS-Date Objekten zu moment
    }
    return input.format(format || DEFAULT_FORMAT);
  };
});

module.controller('mainController', function ($scope) {
  $scope.user = {
    datePicker: moment().format('YYYY-MM-DD'),
    // Extra Datensatz damit gezeigt wird das auch Daten als input angenommen werden
    datePicker2: moment('2011-11-1', 'YYYY-MM-DD').format('YYYY-MM-DD')
  };
});

module.directive('theDatepicker', function ($parse) {
  return {
    restrict: "AE",
    replace: true,
    transclude: false,

    compile: function (elem, attrs) {
      var modelAccess = $parse(attrs.ngModel),
          inputField = '<input type="text" name="' + attrs.name + '" id="' + attrs.id + '"></input>',
          newElement = $(inputField);
      elem.replaceWith(newElement);

      return function (scope, elem, attrs) {
        var changeDate = function () {
          var _date = moment(elem.datepicker("getDate")).format('YYYY-MM-DD');
          scope.$apply(function (scope) {
            modelAccess.assign(scope, _date);
          });
        };

        elem.datepicker({
          inline: true,
          onClose: changeDate,
          onSelect: changeDate,
          dateFormat: 'yy-mm-dd',
          showButtonPanel: true,
        });

        scope.$watch(modelAccess, function (val) {
          var _date = moment(val).format('YYYY-MM-DD');
          elem.datepicker("setDate", _date);
        });
      };
    } // end compile
  }; // end return
}); // end directive theDatepicker
