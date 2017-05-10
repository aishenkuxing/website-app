<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="herder.jsp" />
<style>
	.agileits_agile_about_mail input{
		margin-top: 1em;
	}
	.resp-tab-content{
		margin-bottom:200px;
	}
</style>
<div class="tab-2 resp-tab-content resp-tab-content-active" aria-labelledby="tab_item-2" style="display:block">
	<!-- contact -->
	<div class="agile_about">
		<div class="agile_about_pos">
			<img src="/resources/home/images/tou.png" alt=" " class="img-responsive" />
		</div>
	</div>
	<div class="agileits_agile_about">
		<h3>联系我</h3>
		<div class="agileits_agile_about_mail">
			<form action="#" method="post">
				<div class="col-md-6 agileits_agile_about_mail_left"  style="margin-bottom: 1em;">
					<label class="label-text">您的姓名</label><input type="text" name="Name" placeholder="姓名" required style="margin-bottom: 1em;">
					<label class="label-text">您的项目</label><input type="text" name="项目" placeholder="项目" required>
				</div>
				<div class="col-md-6 agileits_agile_about_mail_left"  style="margin-bottom: 1em;">
					<label class="label-text">联系邮箱</label><input type="email" name="Email" placeholder="邮箱" required style="margin-bottom: 1em;">
					<label class="label-text">联系电话</label><input type="text" name="Phone" placeholder="手机号" required>
				</div>
				<div class="clearfix"> </div>
				<label>给我留言</label>
				<textarea name="Message" placeholder="给我留言..." required></textarea>
				<input type="submit" value="提交">
			</form>
		</div>
	</div>
	<div class="w3agile_map">
		<!---<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.958900464012!2d36.23097800000001!3d49.993379999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0f009ab9f07%3A0xa21e10f67fa29ce!2sGeorgia+Education+Center!5e0!3m2!1sen!2sin!4v1436943860334" style="border:0"></iframe>--->
		<div class="agileinfo_map_color">
			<div class="agileinfo_map_color_grid">
				<div class="col-md-4 agileinfo_map_color_grid_left">
					<h4><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>我的地址</h4>
					<p>福建省福州市台江区.</p>
				</div>
				<div class="col-md-4 agileinfo_map_color_grid_left">
					<h4><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>我的邮箱：</h4>
					<p>
						<a href="370420544@qq.com"> 370420544@qq.com</a>
					</p>
				</div>
				<div class="col-md-4 agileinfo_map_color_grid_left">
					<h4><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>我的手机</h4>
					<p>13779997332</p>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
</div>
<!-- //contact -->
</div>
<jsp:include page="footer.jsp" />