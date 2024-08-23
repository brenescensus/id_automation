import Image from "next/image";
import React from "react";

export default function Frontid() {
  return (
    <section className="front-id w-[294px] h-[191px] rounded-xl border border-red-700 bg-white ">
      <div className="front-id-container w-[285px] h-[158px]   flex flex-col my-2 mx-auto">
        <div className="uppercase text-red-600 text-[14px] font-bold text-center font-[Arial] ">consolidated hr solutions</div>
        <div className="content  flex flex-row justify-between mx-5 ">
          <div className="details-logo w-2/3 flex flex-col">
            <div className="logo   flex items-center justify-center">
                <Image src="/Images/logo/hrlogo.png" alt="logo" width={80} height={80} className="h-[54px] w-[106px]" />
            </div>
              <div className="details flex flex-col w-[182px]  ">
                <div className="flex flex-row border-b-gray border-b-2 h-[15px] items-center ">
                  {/* <h1 className="text-xl text-black font-extralight">Name:</h1> */}
                  <h6 className="uppercase font-[Calibri] text-black text-[14px]">
                    John Doevhvhhjjh
                  </h6>
                </div>
                <div className="flex flex-row items-center border-b-gray border-b-2 h-[15px] justify-start">
                  <h1 className="font-[Roboto] uppercase text-black font-light mr-1 text-[9px]">Desig:</h1>
                  <h6 className="capitalize font-[Roboto] text-black text-[12px] font-bold">
                   hr & cook
                  </h6>
                </div>
                <div className="flex flex-row items-center border-b-gray border-b-2 h-[15px] justify-start">
                  <h1 className="font-[Roboto] uppercase text-black  font-light text-[9px]">Dept:</h1>
                  <h6 className="capitalize text-black font-[Roboto] font-bold text-[12px]">
                    Admin
                  </h6>
                </div>
                <div className="flex flex-row items-center border-b-gray border-b-2 h-[15px] justify-start">
                  <h1 className="font-[Roboto] uppercase text-black  font-light text-[9px]">ID NO:</h1>
                  <h6 className="capitalize font-[Roboto] text-black font-bold text-[12px]">
                    100084
                  </h6>
                </div>
              </div>
          </div>
          <div className="profile w-1/3  rounded-[50%] content-center  flex items-center justify-center">    
                         <Image src="/Images/passport/pass1.webp" alt="logo" width={80} height={30} className=" h-[96px] w-[128px]" />
          </div>
        </div>
        <div className="uppercase text-center text-red-600 bg-blue-900 mx-5  h-[22px] ">emp no:002</div>
      </div>
    </section>
  );
}
