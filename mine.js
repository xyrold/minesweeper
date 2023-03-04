let _totalCredits = 50000;
        const _bet = 1000;

        let _hitPoints = 0;

        //random the bomb

        const _minNum = 1;
        const _maxNum = 25;

        //store bomb location in array
        let _bombLocation = [];


        function initMine() {
            $('.hitOption').removeClass("hitPoint");
            $("#cashoutAmount span").text(0);
            $("#btnPlayAgain").hide();
            $("#btnCashOut").show();
            _hitPoints = 0;
            _bombLocation = [];
            //create 4 random locations of bomb
            for (let i = 1; i <= 4; i++) {
                const _rndBombLocation = Math.floor(Math.random() * (_maxNum - _minNum + 1)) + _minNum;

                const _isExist = _bombLocation.indexOf(Number(_rndBombLocation)) > -1;
                if (!_isExist) {
                    _bombLocation.push(_rndBombLocation);
                } else {
                    i--;
                }

                console.log(_rndBombLocation);
                console.log(_isExist);


            }
        }
        /*const _rndBombLocation = Math.floor(Math.random() * (_maxNum - _minNum + 1)) + _minNum;*/

        initMine();

        

        //when clicking the boxes
        $(".mineItem").click(function () {
            this.mineId = $(this).attr("data-item");
            console.log(this.mineId);

            //set bet amount
            this.betAmount = 1000;

            //check bomb location
            const _isExist = _bombLocation.indexOf(Number(this.mineId)) > -1;
            console.log(_isExist);
            if (_isExist) {
                console.log("game over");

                $(".mineItem").addClass("notBomb");

                _bombLocation.forEach(function (itm) {
                    $(".mItem_" + itm).removeClass("notBomb").addClass("BombItem");
                })

                $("#btnPlayAgain").show();
                $("#btnCashOut").hide();

            } else {
                console.log("win +1 point");
                $(".mItem_" + this.mineId).addClass("notBomb");

                _hitPoints += 1;
                $('.hitOption').removeClass("hitPoint");
                $('.hitOption[data-hit=' + _hitPoints + ']').addClass("hitPoint");

                this.points = $('.hitOption[data-hit=' + _hitPoints + ']').attr("data-return");
                console.log(this.points);

                this.winAmount = Number(this.betAmount) * Number(this.points);
                $("#cashoutAmount span").text(this.winAmount);
            }

        })

        $("#btnCashOut").click(function () {
           
            $(".mineItem").removeClass("notBomb").removeClass("BombItem");
            this.cash = $("#cashoutAmount span").text();
            _totalCredits += Number(this.cash);
            $("#totalCredits").text(_totalCredits);
            initMine();
        })

        $("#btnPlayAgain").click(function () {
            $(".mineItem").removeClass("notBomb").removeClass("BombItem");
            _totalCredits -= _bet;
            $("#totalCredits").text(_totalCredits);
            initMine();
        })