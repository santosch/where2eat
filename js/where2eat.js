$(document).ready(function () {

    var
        /**
         * The filter sliders
         * @var {jQuery}
         */
        $sliders,

        /**
         * Options for list.js
         * @var {object}
         * @type {{valueNames: string[], item: string}}
         */
        options = {
            valueNames: [
                'name',
                'address',
                'telephone',
                {attr: 'href', name: 'url'},
                {attr: 'data-src', name: 'mapslink'},
                'distance',
                'waytime',
                'staytime',
                'time',
                'avgcosts',
                'type',
                'tags'

            ],
            item: 'listEntry'
        },

        /**
         * Builds list values based on data entry
         * @param entry
         * @returns {*}
         */
        parseEntry = function (entry) {
            // calc time
            entry.time = (2 * entry.waytime) + entry.staytime;

            // create mapslink
            var apikey = 'AIzaSyCcwDmN5v6-MEXlaNzb9nuc8H46b-OF-JM',
                addressstring = entry.name + ', ' + entry.address + ', Augsburg';

            entry.mapslink = 'https://www.google.com/maps/embed/v1/place?key=' + apikey + '&q=' + encodeURIComponent(addressstring);
            return entry;
        },


        eatList = new List('eatlist', options),

        /**
         * Adds data to the list
         * @param data
         */
        applyList = function (data) {
            eatList.add(data.map(parseEntry), function () {
                console.log('Successfully added list items');
            });
        },

        /**
         * Loads data into a list
         * @param location
         */
        loadList = function (location) {

            $.getJSON('data/' + location + '.json', {}, function (data, status) {
                console.log('Status: ' + status);
                applyList(data);

                // Trigger filtering
                $sliders.change();
            });
        },

        /**
         * Applies all selected filters
         * @param {int} maxprice
         * @param {int} maxtime
         * @param {int} maxway
         */
        applyFilter = function (maxprice, maxtime, maxway) {

            eatList.filter(function (item) {

                // price filter
                if (item.values().avgcosts > maxprice) {
                    return false;
                }

                // time filter
                if (item.values().time > maxtime) {
                    return false;
                }

                // distance filter
                if (item.values().distance > maxway) {
                    return false;
                }

                return true;
            });
        },

        /**
         * Updates the sorting
         * @param {string} by
         */
        updateSorting = function (by) {
            eatList.sort(by, {order: "asc"});
        },

        /**
         * Initializes the Bootstrap Sliders
         */
        initFilterSlider = function () {
            var $maxprice = $('#maxprice').slider({
                    tooltip: "always",
                    min: 5,
                    max: 25,
                    value: 15,
                    ticks: [5, 10, 15, 20, 25],
                    formatter: function (value) {
                        return value + ' €';
                    }
                }),
                $maxtime = $('#maxtime').slider({
                    tooltip: 'always',
                    min: 15,
                    max: 90,
                    value: 60,
                    step: 5,
                    ticks: [15, 30, 45, 60, 75, 90],
                    formatter: function (value) {
                        if (value < 60) {
                            return value + 'm';
                        }
                        return (Math.floor(value / 60) + 'h') + ((value % 60 > 0) ? (' ' + value % 60 + 'm') : '');
                    }
                }),
                $maxway = $('#maxway').slider({
                    tooltip: 'always',
                    min: 100,
                    step: 50,
                    max: 1000,
                    value: 500,
                    formatter: function (value) {
                        return value + 'm';
                    }
                });

            $sliders = $maxprice.add($maxtime).add($maxway);

            // register event
            $sliders.on('change', function () {
                applyFilter(
                    $maxprice.val(),
                    $maxtime.val(),
                    $maxway.val()
                )
            });
        },

        /**
         * Initializes the sort selector
         */
        initSorting = function () {
            var $orderPrice = $('#orderByMaxprice'),
                $orderTime = $('#orderByMaxtime'),
                $orderDistance = $('#orderByMaxway'),
                $orderSelectors = $orderPrice.add($orderTime).add($orderDistance);

            $orderSelectors.change(function () {
                if ($orderPrice.is(':checked')) {
                    updateSorting('avgcosts');
                }
                if ($orderTime.is(':checked')) {
                    updateSorting('time');
                }
                if ($orderDistance.is(':checked')) {
                    updateSorting('distance');
                }
            });
        },

        /**
         * Initializes the lazy map loading and collapsible
         */
        initLazyMapLoading = function () {
            $('body').click(function (e) {
                var $target = $(e.target);
                if ($target.hasClass('mapToggler')) {

                    var $collapsible = $target.parents('.panel').find('.collapsible'),
                        $map = $collapsible.find('iframe');

                    // Toggle collapsible
                    $collapsible.collapse('toggle');

                    // Load map
                    if (!$map.attr('src')) {
                        $map.attr('src', $map.data('src'));
                    }
                }
            });
        }

        ;

    initFilterSlider();
    initSorting();
    loadList('augsburg');
    initLazyMapLoading();

});