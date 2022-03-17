const dijkstras = (source,destination,rowRange,colRange,wallList) => {
    source = source.replace("row","").split("col")
    source = source.map((src)=>{
        return parseInt(src)
    })

    destination = destination.replace("row","").split("col")
    destination = destination.map((src)=>{
        return parseInt(src)
    })
    let distances= [0]
    const minPQ = [[source,0,source]]
    const visited = new Set([source])
    let count = 0
    const visit= []
    while(minPQ.length > 0)
    {
        
        const [current,distance,prev] = minPQ.shift()
        visit.push([current,prev])
        animateSelected(current,count)
        count++;
     
        if(compareLists(current,destination))
        {
            return [visit,count]
        }
    
        
        if(checkIfContains(visited,[current[0],current[1]+1]) && current[0] >= 0 && current[1]+1 < colRange && current[1] >= 0 && current[0] < rowRange && checkIfContainss(wallList,[current[0],current[1]+1]))
        {
            minPQ.push([[current[0],current[1]+1],distance+1,current])
            visited.add([[current[0],current[1]+1],current])
            // animateSelected([current[0],current[1]+1],count+3)
        }    
        if(checkIfContains(visited,[current[0]-1,current[1]]) && current[0]-1 >= 0  && current[1] >= 0 && current[1] < colRange && checkIfContainss(wallList,[current[0]-1,current[1]]))
        {
            
            minPQ.push([[current[0]-1,current[1]],distance+1,current])
            visited.add([[current[0]-1,current[1]],current])
            // animateSelected([current[0]-1,current[1]],count)
        }
        if(checkIfContains(visited,[current[0],current[1]-1]) && current[0] >= 0 && current[0] < rowRange && current[1]-1 >= 0 && current[1] < colRange && checkIfContainss(wallList,[current[0],current[1]-1]))
        {
            minPQ.push([[current[0],current[1]-1],distance+1,current])
            visited.add([[current[0],current[1]-1],current])
            // animateSelected([current[0],current[1]-1],count+2)
        }
        
        if(checkIfContains(visited,[current[0]+1,current[1]]) && current[0] >= 0 && current[0]+1 < rowRange && current[1] >= 0 && current[1] < colRange && checkIfContainss(wallList,[current[0]+1,current[1]]))
        {
            
            minPQ.push([[current[0]+1,current[1]],distance+1,current])
            visited.add([[current[0]+1,current[1]],current])
            // animateSelected([current[0]+1,current[1]],count+1)
        }
        
        sortMinPQ(minPQ)
    }
    return -1

}

const compareLists = (source,destination)=>{
    if(source.toString() == destination.toString())
    {
        return true
    }
    return false
}

const checkIfContains = (visited,list) =>
{
    for(let i of visited)
    {
        // console.log(i);
        if (i[0].toString() == list.toString())
        {
            return false
        }
    }
    return true
    
}
const checkIfContainss = (visited,list) =>
{
    for(let i of visited)
    {
        // console.log(i);
        if (i.toString() == list.toString())
        {
            return false
        }
    }
    return true
    
}


const animateSelected = (current,count) => {
    const node = document.getElementById(`row${current[0]}col${current[1]}`)
    setTimeout(()=>{node.classList.add("animated")},count*10)
}

const sortMinPQ = (minPQ)=>{
    minPQ.sort((a,b)=>a[1]-b[1])
}

export default dijkstras