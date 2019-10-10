(function() {
    'use strict';
    angular.module('theHiveServices')
        .service('CaseSrv', function($http, $resource) {

            var resource = $resource('./api/case/:caseId', {}, {
                update: {
                    method: 'PATCH'
                },
                links: {
                    method: 'GET',
                    url: './api/case/:caseId/links',
                    isArray: true
                },
                merge: {
                    method: 'POST',
                    url: './api/case/:caseId/_merge/:mergedCaseId',
                    params: {
                        caseId: '@caseId',
                        mergedCaseId: '@mergedCaseId',
                    }
                },
                forceRemove: {
                    method: 'DELETE',
                    url : './api/case/:caseId/force',
                    params: {
                        caseId: '@caseId'
                    }
                },
                query: {
                    method: 'POST',
                    url: './api/case/_search',
                    isArray: true
                },
                alerts: {
                  method: 'POST',
                  url: './api/alert/_search',
                  isArray: true
                }
            });

            this.get = resource.get;
            this.alerts = resource.alerts;
            this.save = resource.save;
            this.forceRemove = resource.forceRemove;
            this.links = resource.links;
            this.update = resource.update;
            this.merge = resource.merge;
            this.query = resource.query;

            this.getShares = function(id) {
                return $http.get('./api/case/'+id+'/shares');
            };

            this.setShares = function(id, shares) {
                return $http.put('./api/case/'+id+'/shares', {
                    "shares": shares
                });
            };
        });

})();
