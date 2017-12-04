<?php
/**
 * The Sidebar containing the main widget area.
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

$options = twentyeleven_get_theme_options();
$current_layout = $options['theme_layout'];

if ( 'content' != $current_layout ) :
?>
		<div id="secondary" class="widget-area leftCol" role="complementary">
		
			<?php if ( ! dynamic_sidebar( 'sidebar-1' ) ) : ?>

				<aside id="archives" class="widget">
					<h3 class="widget-title"><?php _e( 'Archives', 'twentyeleven' ); ?></h3>
					<ul>
						<?php wp_get_archives( array( 'type' => 'monthly' ) ); ?>
					</ul>
				</aside>

				<aside id="meta" class="widget">
					<h3 class="widget-title"><?php _e( 'Meta', 'twentyeleven' ); ?></h3>
					<ul>
						<?php wp_register(); ?>
						<li><?php wp_loginout(); ?></li>
						<?php wp_meta(); ?>
					</ul>
				</aside>
				


			<?php endif; // end sidebar widget area ?>
			
			<aside id="categories-list">
				<h3 class="widget-title">t&oacute;picos recentes</h3>
				<ul>			
				<?php
				//get all categories then display all posts in each term
				$taxonomy = 'category';
				$param_type = 'category__in';
				$term_args=array(
				  'orderby' => 'name',
				  'order' => 'ASC'
				);
				$terms = get_terms($taxonomy,$term_args);
				if ($terms) {
				  foreach( $terms as $term ) {
				    $args=array(
				      "$param_type" => array($term->term_id),
				      'post_type' => 'post',
				      'post_status' => 'publish',
				      'posts_per_page' => 2,
				      'caller_get_posts'=> 1
				      );
				    $my_query = null;
				    $my_query = new WP_Query($args);
				    if( $my_query->have_posts() ) {  ?>

					<li>
						<h4 class="widget-subtitle"><?php echo '<a href="'.get_category_link($term->term_id). '" title="' . sprintf( __( "View all posts in %s" ), $term->name ). '">' . $term->name . '</a>'?></h4>
						<ul>
							<?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
								<li>
									<span class="post-date"><?php the_date(); ?></span>
									<a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php title_lenght(30); ?></a>
								</li>
							<?php endwhile; ?>
						</ul>
					</li>
	
				 <?php
				    }
				  }
				}
				wp_reset_query();  // Restore global post data stomped by the_post().
				?>
				</ul>
			</aside>
				
				
		</div><!-- #secondary .widget-area -->
<?php endif; ?>