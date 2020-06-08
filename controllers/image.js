const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: '5e8fb5c8e57e46759de4db8deed9ce77'
   });

const handleAPIcalls=(req,res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err=>res.status(400).json('unable to work with API'));
}

const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage:handleImage,
    handleAPIcalls:handleAPIcalls
};