import { CirclePlus, SquareMinus, SquareArrowUpRight} from 'lucide-react';
import SectionWrapper from './SectionWrapper';

function CreateMovement() {
    return (
        <SectionWrapper className=' flex justify-around flex-col items-center gap-8'>
                <div>
                    <h2 className='text-2xl font-semibold'>Create Movement</h2>
                </div>
            <div className='flex text-center gap-4'>
                <div className='flex flex-col items-center'>
                    <a href="">
                        <CirclePlus size={64} color="#3cb566" />
                    </a>
                    <span>New income</span>
                </div>
                <div className='flex flex-col items-center'>
                    <a href="">
                        <SquareMinus size={64} color="#ff6b6b" />
                        
                    </a>
                    <span>New expense</span>

                </div>
                <div className='flex flex-col items-center'>
                    <a href="">
                        <SquareArrowUpRight size={64} color="#ffa340" />
                    </a>
                    <span> New transfer</span>

                </div>
            </div>
        </SectionWrapper>
    );
}
export default CreateMovement;