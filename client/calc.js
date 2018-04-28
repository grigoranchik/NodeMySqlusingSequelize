angular.module("myApp",[]).controller("firstCtrl", ['$scope', '$http', function($scope, $http){
    $scope.tempInput="";
    $scope.Calk_memory_1;
    $scope.Calk_memory_2;
    $scope.Znak_memory;

    $scope.daivalue=function(myIntValue){
        this.pastElement(this.getElement() + myIntValue.toString());
        this.Calk_memory_2=this.getElement();
    };

    $scope.equals=function(){
        $scope.sendMessageToServer();
    };

    $scope.getElement=function(){         // узнать/запомнить/возвратить значение записанного поля
        return $scope.tempInput;
    };
    $scope.pastElement=function(pastElem){//вставить значение в поле
        $scope.tempInput=pastElem;
    };
    $scope.delElement=function(){         // очистить поле
        $scope.tempInput="";
    };

    $scope.add=function(){
        this.Calk_memory_1=this.getElement();
        this.delElement();
        this.Znak_memory='+';
    };
    $scope.subtraction=function(){
        this.Calk_memory_1=this.getElement();
        this.delElement();
        this.Znak_memory='-';
    };
    $scope.division=function(){
        this.Calk_memory_1=this.getElement();
        this.delElement();
        this.Znak_memory='/';
    };
    $scope.multiplication=function(){
        this.Calk_memory_1=this.getElement();
        this.delElement();
        this.Znak_memory='*';
    };
    $scope.zeroing=function(){

        this.delElement();
        //debugger;
        this.Calk_memory_1='';
        this.Znak_memory='';
    };

    function fuckMe(){
        alert('I was fucked..');
    }


    $scope.sendMessageToServer=function() {
        var promise = $http.post('/equals', {Calk_memory_1: $scope.Calk_memory_1, Calk_memory_2: $scope.Calk_memory_2, Znak_memory: $scope.Znak_memory }, {});

        promise.then(function (response) {
            $scope.tempInput=response.data;
            $scope.Calk_memory_1 = parseInt($scope.tempInput);

        });
    }

}]);


		
		
		
		
		