<!--
    url: http://lukaslanger.bplaced.net/teamprojekt/
-->
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>Wheater-Station-Frontend</title>
        <link rel="stylesheet" type="text/css" href="style/style.css">
        <style>
            .select {
                text-align: center;
            }

            .box {
                width: 450px;
                height: 250px;
                background-color: #f2f2f2;
                border: 1px solid #337ab7;
                border-radius: 5px;
                text-align: center;
                position: relative;
                margin: auto;
                margin-top: 50px;
            }

            .title {
                margin-top: 10%;
                font-size: large;
                font-weight: 700;
            }

            .degrees {
                margin-top: 10%;
                font-size: xx-large;
                font-weight: 400;
            }

            .date {
                margin-top: 10%;
                font-size: large;
                font-weight: 400;
            }
        </style>
    </head>
    <body>
        <script>
            var request = new XMLHttpRequest();

            request.open('GET', 'url', true);
            request.send();

            request.onreadystatechange = (e) => {
                var data = request.responseText;
                console.log(data)
            }
        </script>
        <div class="select">
            <form action="index.php" method="post" autocomplete="off">
                <select name="station" id="station">
                    <option value="Station1">Station 1</option>
                    <option value="Station2">Station 2</option>
                    <option value="Station3">Station 3</option>
                </select>
                <input type="submit" value="Submit">
            </form>
        </div>
    </body>
</html>

<?php
    $ws = new WeatherStation();
    $data = $ws->getData();
    if ($_POST['station']) {
        echo '
        <div class="box">
            <div class="title">'.$_POST['station'].'</div>
            <div class="degrees">'.$data[$_POST['station']].'° C</div>
            <div class="date">'.date("H:i - d.m.Y").'</div>
        </div>
        ';
    }

class WeatherStation {
    public function getData() {
        return [
            'Station1' => 23,
            'Station2' => 25,
            'Station3' => 27
        ];
    }
}