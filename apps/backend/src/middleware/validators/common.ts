import { IdRequestSchema, activeSchema } from '@mind-challenge4/share-types';

export const validateGetIdIsNumber = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    IdRequestSchema.parse({ id });
    next();
  } catch (err: any) {
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
};

export const validateActiveSchema = (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    activeSchema.parse({
      id,
      active: req.body.active
    })
    const activeValue = req.body.active.toLowerCase()
    if(activeValue === 'true' || activeValue === 'false'){ 
      next();
    }else {
      throw new Error('active is not a valid value');
    }
  }catch(err:any){
    res.status(400);
    res.json({ errors: err.errors[0].message });
  }
}