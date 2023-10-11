import React from 'react'

const App = () => {
  return (
    <>
	{/* <!-- begin #page-loader --> */}
	<div id="page-loader" className="fade in"><span className="spinner"></span></div>
	{/* <!-- end #page-loader --> */}
	
	{/* <!-- begin #page-container --> */}
	<div id="page-container" className="page-container fade page-sidebar-fixed page-header-fixed">
		{/* <!-- begin #header --> */}
		<div id="header" className="header navbar navbar-default navbar-fixed-top">
			{/* <!-- begin container-fluid --> */}
			<div className="container-fluid">
				{/* <!-- begin mobile sidebar expand / collapse button --> */}
				<div className="navbar-header">
					<a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a>
					<button type="button" className="navbar-toggle" data-click="sidebar-toggled">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div>
				{/* <!-- end mobile sidebar expand / collapse button --> */}
				
				{/* <!-- begin header navigation right --> */}
				<ul className="nav navbar-nav navbar-right">
					<li>
						<form className="navbar-form full-width">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter keyword" />
								<button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
							</div>
						</form>
					</li>
					<li className="dropdown">
						<a href="#" data-toggle="dropdown" className="dropdown-toggle f-s-14">
							<i className="fa fa-bell-o"></i>
							<span className="label">5</span>
						</a>
						<ul className="dropdown-menu media-list pull-right animated fadeInDown">
                            <li className="dropdown-header">Notifications (5)</li>
                            <li className="media">
                                <a href="#">
                                    <div className="media-left"><i className="fa fa-bug media-object bg-red"></i></div>
                                    <div className="media-body">
                                        <h6 className="media-heading">Server Error Reports</h6>
                                        <div className="text-muted f-s-11">3 minutes ago</div>
                                    </div>
                                </a>
                            </li>
                            <li className="media">
                                <a href="#">
                                    <div className="media-left"><img src="assets/img/user-1.jpg" className="media-object" alt="" /></div>
                                    <div className="media-body">
                                        <h6 className="media-heading">John Smith</h6>
                                        <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                        <div className="text-muted f-s-11">25 minutes ago</div>
                                    </div>
                                </a>
                            </li>
                            <li className="media">
                                <a href="#">
                                    <div className="media-left"><img src="assets/img/user-2.jpg" className="media-object" alt="" /></div>
                                    <div className="media-body">
                                        <h6 className="media-heading">Olivia</h6>
                                        <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                        <div className="text-muted f-s-11">35 minutes ago</div>
                                    </div>
                                </a>
                            </li>
                            <li className="media">
                                <a href="#">
                                    <div className="media-left"><i className="fa fa-plus media-object bg-green"></i></div>
                                    <div className="media-body">
                                        <h6 className="media-heading"> New User Registered</h6>
                                        <div className="text-muted f-s-11">1 hour ago</div>
                                    </div>
                                </a>
                            </li>
                            <li className="media">
                                <a href="#">
                                    <div className="media-left"><i className="fa fa-envelope media-object bg-blue"></i></div>
                                    <div className="media-body">
                                        <h6 className="media-heading"> New Email From John</h6>
                                        <div className="text-muted f-s-11">2 hour ago</div>
                                    </div>
                                </a>
                            </li>
                            <li className="dropdown-footer text-center">
                                <a href="#">View more</a>
                            </li>
						</ul>
					</li>
					<li className="dropdown navbar-user">
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">
							<img src="assets/img/user-13.jpg" alt="" /> 
							<span className="hidden-xs">Adam Schwartz</span> <b className="caret"></b>
						</a>
						<ul className="dropdown-menu animated fadeInLeft">
							<li className="arrow"></li>
							<li><a href="#">Edit Profile</a></li>
							<li><a href="#"><span className="badge badge-danger pull-right">2</span> Inbox</a></li>
							<li><a href="#">Calendar</a></li>
							<li><a href="#">Setting</a></li>
							<li className="divider"></li>
							<li><a href="#">Log Out</a></li>
						</ul>
					</li>
				</ul>
				{/* <!-- end header navigation right --> */}
			</div>
			{/* <!-- end container-fluid --> */}
		</div>
		{/* <!-- end #header --> */}
		
		{/* <!-- begin #sidebar --> */}
		<div id="sidebar" className="sidebar">
			{/* <!-- begin sidebar scrollbar --> */}
			<div data-scrollbar="true" data-height="100%">
				{/* <!-- begin sidebar user --> */}
				<ul className="nav">
					<li className="nav-profile">
						<div className="image">
							<a href="#"><img src="assets/img/user-13.jpg" alt="" /></a>
						</div>
						<div className="info">
							Sean Ngu
							<small>Front end developer</small>
						</div>
					</li>
				</ul>
				{/* <!-- end sidebar user -->
				<!-- begin sidebar nav --> */}
				<ul className="nav">
					<li className="nav-header">Navigation</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-laptop"></i>
						    <span>Dashboard</span>
					    </a>
						<ul className="sub-menu">
						    <li><a href="index.html">Dashboard v1</a></li>
						    <li><a href="index_v2.html">Dashboard v2</a></li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
							<span className="badge pull-right">10</span>
							<i className="fa fa-inbox"></i> 
							<span>Email</span>
						</a>
						<ul className="sub-menu">
						    <li><a href="email_inbox.html">Inbox v1</a></li>
						    <li><a href="email_inbox_v2.html">Inbox v2</a></li>
						    <li><a href="email_compose.html">Compose</a></li>
						    <li><a href="email_detail.html">Detail</a></li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-suitcase"></i>
						    <span>UI Elements <span className="label label-theme m-l-5">NEW</span></span> 
						</a>
						<ul className="sub-menu">
							<li><a href="ui_general.html">General</a></li>
							<li><a href="ui_typography.html">Typography</a></li>
							<li><a href="ui_tabs_accordions.html">Tabs & Accordions</a></li>
							<li><a href="ui_unlimited_tabs.html">Unlimited Nav Tabs</a></li>
							<li><a href="ui_modal_notification.html">Modal & Notification</a></li>
							<li><a href="ui_widget_boxes.html">Widget Boxes</a></li>
							<li><a href="ui_media_object.html">Media Object</a></li>
							<li><a href="ui_buttons.html">Buttons</a></li>
							<li><a href="ui_icons.html">Icons</a></li>
							<li><a href="ui_simple_line_icons.html">Simple Line Icons</a></li>
							<li><a href="ui_ionicons.html">Ionicons</a></li>
							<li><a href="ui_tree.html">Tree View</a></li>
							<li><a href="ui_language_bar_icon.html">Language Bar & Icon</a></li>
							<li><a href="ui_social_buttons.html">Social Buttons<i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
							<li><a href="ui_tour.html">Intro JS<i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-file-o"></i>
						    <span>Form Stuff <span className="label label-theme m-l-5">NEW</span></span> 
						</a>
						<ul className="sub-menu">
							<li><a href="form_elements.html">Form Elements</a></li>
							<li><a href="form_plugins.html">Form Plugins <i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
							<li><a href="form_slider_switcher.html">Form Slider + Switcher</a></li>
							<li><a href="form_validation.html">Form Validation</a></li>
							<li><a href="form_wizards.html">Wizards</a></li>
							<li><a href="form_wizards_validation.html">Wizards + Validation</a></li>
							<li><a href="form_wysiwyg.html">WYSIWYG</a></li>
							<li><a href="form_editable.html">X-Editable</a></li>
							<li><a href="form_multiple_upload.html">Multiple File Upload</a></li>
							<li><a href="form_summernote.html">Summernote <i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
							<li><a href="form_dropzone.html">Dropzone <i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-th"></i>
						    <span>Tables</span>
						</a>
						<ul className="sub-menu">
							<li><a href="table_basic.html">Basic Tables</a></li>
							<li className="has-sub">
							    <a href="#"><b className="caret pull-right"></b> Managed Tables</a>
							    <ul className="sub-menu">
							        <li><a href="table_manage.html">Default</a></li>
							        <li><a href="table_manage_autofill.html">Autofill</a></li>
							        <li><a href="table_manage_buttons.html">Buttons</a></li>
							        <li><a href="table_manage_colreorder.html">ColReorder</a></li>
							        <li><a href="table_manage_fixed_columns.html">Fixed Column</a></li>
							        <li><a href="table_manage_fixed_header.html">Fixed Header</a></li>
							        <li><a href="table_manage_keytable.html">KeyTable</a></li>
							        <li><a href="table_manage_responsive.html">Responsive</a></li>
							        <li><a href="table_manage_rowreorder.html">RowReorder</a></li>
							        <li><a href="table_manage_scroller.html">Scroller</a></li>
							        <li><a href="table_manage_select.html">Select</a></li>
							        <li><a href="table_manage_combine.html">Extension Combination</a></li>
							    </ul>
							</li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
							<i className="fa fa-star"></i> 
							<span>Front End</span>
						</a>
						<ul className="sub-menu">
						    <li><a href="../../frontend/one-page-parallax/index.html" target="_blank">One Page Parallax</a></li>
						    <li><a href="../../frontend/blog/index.html" target="_blank">Blog</a></li>
						    <li><a href="../../frontend/forum/index.html" target="_blank">Forum</a></li>
						    <li><a href="../../frontend/e-commerce/index.html" target="_blank">E-Commerce</a></li>
						</ul>
					</li>
					<li className="has-sub">
					    <a href="#">
						    <b className="caret pull-right"></b>
					        <i className="fa fa-envelope"></i>
					        <span>Email Template</span>
					    </a>
						<ul className="sub-menu">
							<li><a href="email_system.html">System Template</a></li>
							<li><a href="email_newsletter.html">Newsletter Template</a></li>
						</ul>
					</li>
					<li className="has-sub">
					    <a href="#">
						    <b className="caret pull-right"></b>
					        <i className="fa fa-area-chart"></i>
						    <span>Chart</span>
						</a>
						<ul className="sub-menu">
						    <li><a href="chart-flot.html">Flot Chart</a></li>
						    <li><a href="chart-morris.html">Morris Chart</a></li>
							<li><a href="chart-js.html">Chart JS</a></li>
						    <li><a href="chart-d3.html">d3 Chart</a></li>
						</ul>
					</li>
					<li><a href="calendar.html"><i className="fa fa-calendar"></i> <span>Calendar</span></a></li>
					<li className="has-sub">
					    <a href="#">
					        <b className="caret pull-right"></b>
					        <i className="fa fa-map-marker"></i>
					        <span>Map</span>
					    </a>
						<ul className="sub-menu">
							<li><a href="map_vector.html">Vector Map</a></li>
							<li><a href="map_google.html">Google Map</a></li>
						</ul>
					</li>
					<li className="has-sub">
					    <a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-camera"></i>
						    <span>Gallery</span>
						</a>
					    <ul className="sub-menu">
					        <li><a href="gallery.html">Gallery v1</a></li>
					        <li><a href="gallery_v2.html">Gallery v2</a></li>
					    </ul>
					</li>
					<li className="has-sub active">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-cogs"></i>
						    <span>Page Options</span>
						</a>
						<ul className="sub-menu">
							<li className="active"><a href="page_blank.html">Blank Page</a></li>
							<li><a href="page_with_footer.html">Page with Footer</a></li>
							<li><a href="page_without_sidebar.html">Page without Sidebar</a></li>
							<li><a href="page_with_right_sidebar.html">Page with Right Sidebar</a></li>
							<li><a href="page_with_minified_sidebar.html">Page with Minified Sidebar</a></li>
							<li><a href="page_with_two_sidebar.html">Page with Two Sidebar</a></li>
							<li><a href="page_with_line_icons.html">Page with Line Icons</a></li>
							<li><a href="page_with_ionicons.html">Page with Ionicons</a></li>
							<li><a href="page_full_height.html">Full Height Content</a></li>
							<li><a href="page_with_wide_sidebar.html">Page with Wide Sidebar</a></li>
							<li><a href="page_with_light_sidebar.html">Page with Light Sidebar</a></li>
							<li><a href="page_with_mega_menu.html">Page with Mega Menu</a></li>
                            <li><a href="page_with_top_menu.html">Page with Top Menu</a></li>
                            <li><a href="page_with_boxed_layout.html">Page with Boxed Layout</a></li>
                            <li><a href="page_with_mixed_menu.html">Page with Mixed Menu</a></li>
                            <li><a href="page_boxed_layout_with_mixed_menu.html">Boxed Layout with Mixed Menu</a></li>
                            <li><a href="page_with_transparent_sidebar.html">Page with Transparent Sidebar</a></li>
						</ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-gift"></i>
						    <span>Extra</span>
						</a>
						<ul className="sub-menu">
						    <li><a href="extra_timeline.html">Timeline</a></li>
						    <li><a href="extra_coming_soon.html">Coming Soon Page</a></li>
							<li><a href="extra_search_results.html">Search Results</a></li>
							<li><a href="extra_invoice.html">Invoice</a></li>
							<li><a href="extra_404_error.html">404 Error Page</a></li>
							<li><a href="extra_profile.html">Profile Page</a></li>
						</ul>
					</li>
					<li className="has-sub">
					    <a href="#">
					        <b className="caret pull-right"></b>
					        <i className="fa fa-key"></i>
					        <span>Login & Register</span>
					    </a>
					    <ul className="sub-menu">
							<li><a href="login.html">Login</a></li>
					        <li><a href="login_v2.html">Login v2</a></li>
					        <li><a href="login_v3.html">Login v3</a></li>
					        <li><a href="register_v3.html">Register v3</a></li>
					    </ul>
					</li>
					<li className="has-sub">
					    <a href="#">
					        <b className="caret pull-right"></b>
					        <i className="fa fa-cubes"></i>
					        <span>Version <span className="label label-theme m-l-5">NEW</span></span>
					    </a>
					    <ul className="sub-menu">
							<li><a href="#">HTML</a></li>
					        <li><a href="../ajax/index.html">AJAX</a></li>
					        <li><a href="../angularjs/index.html">ANGULAR JS</a></li>
					        <li><a href="../angularjs2/index.html">ANGULAR JS 2 <i className="fa fa-paper-plane text-theme m-l-5"></i></a></li>
					        <li><a href="../material/index.html">MATERIAL DESIGN</a></li>
					    </ul>
					</li>
					<li className="has-sub">
					    <a href="#">
					        <b className="caret pull-right"></b>
					        <i className="fa fa-medkit"></i>
					        <span>Helper</span>
					    </a>
					    <ul className="sub-menu">
							<li><a href="helper_css.html">Predefined CSS Classes</a></li>
					    </ul>
					</li>
					<li className="has-sub">
						<a href="#">
						    <b className="caret pull-right"></b>
						    <i className="fa fa-align-left"></i> 
						    <span>Menu Level</span>
						</a>
						<ul className="sub-menu">
							<li className="has-sub">
								<a href="#">
						            <b className="caret pull-right"></b>
						            Menu 1.1
						        </a>
								<ul className="sub-menu">
									<li className="has-sub">
										<a href="#">
										    <b className="caret pull-right"></b>
										    Menu 2.1
										</a>
										<ul className="sub-menu">
											<li><a href="#">Menu 3.1</a></li>
											<li><a href="#">Menu 3.2</a></li>
										</ul>
									</li>
									<li><a href="#">Menu 2.2</a></li>
									<li><a href="#">Menu 2.3</a></li>
								</ul>
							</li>
							<li><a href="#">Menu 1.2</a></li>
							<li><a href="#">Menu 1.3</a></li>
						</ul>
					</li>
			        {/* <!-- begin sidebar minify button --> */}
					<li><a href="#" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
			        {/* <!-- end sidebar minify button --> */}
				</ul>
				{/* <!-- end sidebar nav --> */}
			</div>
			{/* <!-- end sidebar scrollbar --> */}
		</div>
		<div className="sidebar-bg"></div>
		{/* <!-- end #sidebar --> */}
		
		{/* <!-- begin #content --> */}
		<div id="content" className="content">
			{/* <!-- begin breadcrumb --> */}
			<ol className="breadcrumb pull-right">
				<li><a href="#">Home</a></li>
				<li><a href="#">Page Options</a></li>
				<li className="active">Blank Page</li>
			</ol>
			{/* <!-- end breadcrumb --> */}
			{/* <!-- begin page-header --> */}
			<h1 className="page-header">Blank Page <small>header small text goes here...</small></h1>
			{/* <!-- end page-header --> */}
			
			<div className="row">
			    <div className="col-md-12">
                    <div className="panel panel-inverse">
                        <div className="panel-heading">
                            <div className="panel-heading-btn">
                                <a href="#" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                <a href="#" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                <a href="#" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                <a href="#" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a>
                            </div>
                            <h4 className="panel-title">Panel Title here</h4>
                        </div>
                        <div className="panel-body">
                            Panel Content Here
                        </div>
                    </div>
			    </div>
			</div>
		</div>
		{/* <!-- end #content --> */}
		
		
		{/* <!-- begin scroll to top btn --> */}
		<a href="#" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
		{/* <!-- end scroll to top btn --> */}
	</div>
    </>
  )
}

export default App