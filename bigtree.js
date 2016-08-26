import sizing from './sizing'

export default (walk,display)=> (path, thresh)=>{
  let sizes = {}
  walk(path, sizing(sizes))
    .then(()=>sizes.total > thresh && display(path, sizes))
}

