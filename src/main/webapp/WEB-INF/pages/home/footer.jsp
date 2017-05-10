<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
										<!--footer-->
									</div>
								</div>

							</div>
						</div>
						<div class="clearfix"> </div>
					</div>
					<div class="agileits_copyright">
						<p>Copyright &copy; 2017.黄家成版权所有.</p>
					</div>
				</div>
			</div>
		</body>

</html>

		<script>
			$(document).ready(function(){
				try{
					 var uris = location.pathname.split('.');
					 
					 $('.resp-tab-item').each(function(i,v){
					 	var href = $(this).data('href');
					 	if(uris[0]==href){
					 		$(this).addClass('resp-tab-active');
					 		//break;
					 	}
					 });
					 $('.resp-tab-item').click(function(){
						 location.href=$(this).data('href');
					 })
				}catch(e){
					
				}
			});
		</script>