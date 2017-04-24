const localUrl = document.location.hostname; 

const localRequester = {
	checkIfAvailableFileName: function(fileName) {

	},
	uploadImage: function(image) {
		return $.ajax({
            type:'POST',
            url: localUrl,
            data:image,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	} 
}

export { localRequester };

