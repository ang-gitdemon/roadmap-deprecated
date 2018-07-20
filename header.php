<!doctype html>
<html>

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">

<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

<header id="mainHeader" class="container-fluid">
  <div class="container">
      <section class="row">
          <div id="menu" class="col-md-9">
            <nav class="navbar navbar-expand-lg navbar-light">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <?php wp_nav_menu(array('menu'=>'Primary Menu', 'menu_class' => 'nav navbar-nav' )); ?>
              </div>
            </nav>
          </div>
      </section>
  </div>
</header>
