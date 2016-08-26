import hsize from './hsize'

export default (stats)=> (parent, child)=>{
  if(child.isFile()){
    stats.total = (stats.total || 0) + child.size
    stats.htotal = hsize(stats.total)
  }
}

