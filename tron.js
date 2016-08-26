import walker from './index'
import sizing from './sizing'
import bigTreeDetector from './bigtree'


export default (fs) => reactotron => {
  const walk = walker(fs)

  const bigTree = bigTreeDetector(walk, (path, sizes)=>
    reactotron.display({
      name:'BIGTREE',
      important: true,
      value: {path, size: sizes},
      preview: `Path too big (${sizes.htotal})`
    })
  )

  const dumpTree = (path)=>{
    let value = {}
    walk(path, value).then(()=>reactotron.display({name:'DUMPTREE', value, preview: `Listing: ${path}`}))
  }
  return {
    features: { dumpTree, bigTree }
  }
}
