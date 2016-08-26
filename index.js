import _ from 'lodash'
import hsize from './hsize'

const treevisitor = (tree) =>{
  return (parent, child)=>{
    const p = parent.key.length == 0 ? tree : _.get(tree, parent.key)
    p[child.name] = child.isDirectory() ? {} : child.hsize
  }
}


function walker(fs){
  return function walk(parent, visitor=treevisitor){
    if(typeof(parent) === 'string'){
      parent = {key:[], name:'/', path:parent}
    }
    if(typeof(visitor) === 'object'){
      visitor = treevisitor(visitor)
    }

    return fs.readDir(parent.path)
      .then((result) => {
        let p = Promise.resolve(0)
        result.forEach(res=>{
          p = p.then(()=>{
            const child = Object.assign({}, {key: [...parent.key, res.name], hsize: hsize(res.size)}, res)
            visitor(parent, child)
            if(child.isDirectory()){
              return walk(child, visitor)
            }
          })
        })
        return p
      })
  }
}


export default walker

