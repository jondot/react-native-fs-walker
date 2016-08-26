
import walker from './index'
import bigTreeDetector from './bigtree'

export default (fs)=>{
  const walk = walker(fs)
  return bigTreeDetector(walk, (path, sizes)=>
      console.warn(
        `BigTree: path too big (${sizes.htotal})`,
        {path, size: sizes}
      )
  )
}
