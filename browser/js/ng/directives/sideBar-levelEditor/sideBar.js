app.directive("sideBarLevelEditor", function(){
    return {
        restrict: "E",
        templateUrl: "js/ng/directives/sideBar-levelEditor/sideBar.html",
        controller: 'SideBarLevelEditorController'
    }
});

app.controller('SideBarLevelEditorController', function($scope, $rootScope, PlayerFactory, GameFactory, StateFactory, WaveFactory, EnemyFactory, TowerFactory) {
    $scope.player = PlayerFactory;
    $scope.waves = WaveFactory.waves;
    $scope.numOfEnemies = 0;
    $scope.showTowers = true;
    $scope.firstWave = true;
    $scope.showPowerUps = false;
    $scope.nextWave = false;
    $scope.nextLevel = false;
    $scope.count = 0;
    $scope.state = StateFactory.state;
    $scope.constructors = TowerFactory.towers;
    $scope.towers = [];
    for(let key in TowerFactory.towers){
        let currentTower = new TowerFactory.towers[key](0,0);
        var img = currentTower.imgNum;
        currentTower.imgUrl = "./images/tower-defense-turrets/turret-" + img + "-1.png";
        console.log(currentTower);
        $scope.towers.push(currentTower);
        currentTower.terminate();
    } 
    $rootScope.$on('wavesDone', () => {
        $scope.state = 'complete';
        $scope.$digest();
    })
    $rootScope.$on("nextWave", () => {
        $scope.state = 'standby';
        $scope.$digest();
    });
    $rootScope.$on('removeNextLevel', () => {
        $scope.state = 'standby';
    });
    $rootScope.$on('mapChosen', () => {
        $scope.state = 'standby';
    });
    $rootScope.$on('updateNumberOfEnemies', () => {
        $scope.numOfEnemies = EnemyFactory.enemies.length;
        $scope.$digest();
    });
    $scope.saveGame = () => {
        let player = {
            health: PlayerFactory.health,
            money: PlayerFactory.money
        }
        PlayerFactory.saveGame(player).then((savedInfo) => {
            console.log("Saved Info ", savedInfo);
        });
    }
    $scope.changeStore = (tab) => {
        if(tab === "tower"){
            $scope.showTowers = true;
            $scope.showPowerUps = false;
        }else if(tab === "powerUp") {
            $scope.showTowers = false;
            $scope.showPowerUps = true;
        }else if(tab === "all") {
            $scope.showTowers = true;
            $scope.showPowerUps = true;
        }
    }
    $scope.towerClicked = (tower) => {
        $rootScope.$emit("currentTower", tower);
    }
    $scope.initiateWave = () => {
        GameFactory.changeStateTo("wave");
        $scope.state = StateFactory.state;
        $scope.numOfEnemies = WaveFactory.currentWaveLength();
    }

    $scope.initiateLevel = () => {
        console.log("Next LEvel");
    }

});

function createTowers (){
    return array;
}

