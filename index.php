<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>where2eat</title>

    <!-- CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrapSlider.min.css" rel="stylesheet">
    <link href="css/where2eat.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container-fluid">
    <div class="row" id="eatlist">
        <div class="col-md-4 col-lg-3 bg-primary leftcol">

            <div class="panel panel-primary headerpanel">
                <div class="panel-body text-center">
                    <h1>
                        <small>where</small>
                        2
                        <small>eat</small>
                    </h1>
                </div>
            </div>

            <input class="search form-control" placeholder="SUCHE"/>

            <div class="panel panel-primary filterpanel">
                <div class="panel-body">
                    <?php include('tpl/filters.phtml'); ?>
                </div>
            </div>
			
			<div class="panel panel-primary">
                <div class="panel-body text-center">
                    <a href="https://github.com/santosch/where2eat" target="_blank" class="btn btn-default btn-block">where2eat auf GitHub</a>
					<p class="text-muted"><br/>PullRequests welcome! (Vor allem neue Locations)</p>
                </div>
            </div>
			
			

        </div>
        <div class="col-md-8 col-lg-9 rightside">
            <div class="result-container">
                <div class="list">

                </div>
                <div class="hidden template">
                    <?php include('tpl/item.phtml'); ?>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery-2.2.3.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>
<!-- Slider Plugin -->
<script src="js/bootstrapSlider.min.js"></script>
<!-- List js -->
<script src="js/list.js"></script>
<!-- where2eat js -->
<script src="js/where2eat.js"></script>

</body>
</html>