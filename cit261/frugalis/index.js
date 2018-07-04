(function (window, undefined) {
  "use strict";

  var menuItems = [];

  var createApp = function() {
    var that = {};
    
    that.getUserName = function() {
      return 'Drazen';
    };
    
    that.getActiveBudgetPeriod = function() {
      var period = {
        from: new Date('2018-1-1'),
        until: new Date('2018-1-31'),
      }
      return period;
    };

    that.getDailyBudget = function() {
      return 11275.45;
    };

    that.getTargetBudget = function() {
      return 10000.00;
    };

    that.getAlertsList = function() {
      return ['Utilty bill payment due in 3 days.', 'Collection of rent due tomorrow.'];
    }

    that.getBudgetingPeriodsList = function() {
      return [
        {
          startDate: new Date('2018-1-1'),
          endDate: new Date('2018-1-31'),
          referenceDate: new Date('2018-1-15'),
          status: true,
        },
        {
          startDate: new Date('2018-2-1'),
          endDate: new Date('2018-2-28'),
          referenceDate: new Date('2018-2-15'),
          status: true,
        },
        {
          startDate: new Date('2018-3-1'),
          endDate: new Date('2018-3-31'),
          referenceDate: new Date('2018-3-15'),
          status: true,
        },
        {
          startDate: new Date('2018-4-1'),
          endDate: new Date('2018-4-30'),
          referenceDate: new Date('2018-4-15'),
          status: true,
        },
        {
          startDate: new Date('2018-5-1'),
          endDate: new Date('2018-5-31'),
          referenceDate: new Date('2018-5-15'),
          status: true,
        },
        {
          startDate: new Date('2018-6-1'),
          endDate: new Date('2018-6-30'),
          referenceDate: new Date('2018-6-15'),
          status: true,
        },
        {
          startDate: new Date('2018-7-1'),
          endDate: new Date('2018-7-31'),
          referenceDate: new Date('2018-7-15'),
          status: true,
        },
      ];
    }

    var el = document.getElementById('hamburgerBtn');
    el.addEventListener('click', function() {
      document.getElementById('primaryNav').classList.toggle('hide');
    });

    return that;
  };

  window.frugalisApp = createApp();

}(window));
