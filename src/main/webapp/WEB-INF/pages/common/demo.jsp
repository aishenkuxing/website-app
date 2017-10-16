<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>arTemplate页面测试</title>
        <script src="/resources/scripts/libs/jquery/jquery.js"></script>
		<script src="/resources/scripts/require.js"></script>
		<script src="/resources/scripts/common.js"></script>
		<script>
			require(["templates/widgets"],function(template){
				// var template = require('js/_templates/widgets');
				var _header = $(template('widgets/upload/_header',{id:121212}));
				$('body').append(_header);
			});
		</script>
    </head>
    <body>
    	
 	</body>
</html>