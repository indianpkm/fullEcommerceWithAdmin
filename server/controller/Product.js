import ProductModel from "../model/ProductModel.js"


export const createProduct=async(req,res)=>{
    const product=new ProductModel(req.body)
    try{
        const doc=await product.save()
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err)
    }
}


export const fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let condition = {}
  if(!req.query.admin){
      condition.deleted = {$ne:true}
  }
  
  let query = ProductModel.find(condition);
  let totalProductQuery = ProductModel.find(condition);

    if(req.query.category){
        query=query.find({category:req.query.category});
        totalProductQuery=totalProductQuery.find({category:req.query.category})
    }

    if(req.query.brand){
        query=query.find({brand:req.query.brand});
        totalProductQuery=totalProductQuery.find({brand:req.query.brand})
    }


  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductQuery.count().exec();

  if(req.query._page && req.query._limit){
    const pageSize=req.query._limit;
    const page=req.query._page
    query=query.skip(pageSize*(page-1)).limit(pageSize)
  }

    try{
        const docs=await query.exec();
        res.set('X-Total-Count',totalDocs)
        res.status(200).json(docs)
    }catch(err){
        res.status(400).json(err)
    }
}

export const fetchProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await ProductModel.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findByIdAndUpdate(id, req.body, {new:true});
      const updatedProduct = await product.save()
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  };