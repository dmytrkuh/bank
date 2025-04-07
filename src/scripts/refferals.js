'use server'
import { PrismaClient } from "@prisma/client"
import { ethers  } from 'ethers'

const prisma = new PrismaClient()
export async function setNewRefferal(address, ref) {
    console.log('REFS START')
    if(address != ref && ethers.isAddress(address) && ethers.isAddress(ref)){
    try{
        const findRef = await prisma.refs.findFirst({
            where: {
                address: ref
            }
        })
    if(!findRef){
        const setRef = await prisma.refs.create({
            data: {
                address: ref,
                refAdr: address,
            }
        })
    }
}
    catch(e){
        console.log(e)
    }
}
    }

export async function getRefs(address) {
    try{
        const findRef = await prisma.refs.findMany({
            where: {
                address: address
            }
        })
        if(findRef){
            return findRef.length
        }
        else{
            return null
        }
    } 
    catch(e){
        console.log(e)
    }
}