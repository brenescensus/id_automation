import React from "react";
import Image from "next/image";

export default function BackId() {
  return (
    <>
    <section className="back-id w-[294px] h-[191px] rounded-xl border border-red-700 bg-white ">
    <div className="back-id-container w-[285px] h-[158px]   flex flex-col my-2 mx-auto">
    <div className=" text-[9px] font-[Calibri] italic text-blue-600 mb-1 text-center mx-5 ">
          This Card is issued for identification purposes at work(Sukari
          Industries Ltd) and remains CHRS property which{" "}
          <span className="underline uppercase">Must</span> {" "} be returned upon
          resignation/termination of employment
        </div>

        <div className="content flex flex-row justify-between mx-5 items-center ">
          <div className="content ">
            <p className="italic text-black font-[calibri] text-[9px]">If found please return to the address below</p>
            <h6 className="capitalize text-black font-[calibri] text-[9px] font-bold">    consolidated hr office</h6>
            <p className="text-black capitalize font-[calibri] text-[9px] font-light">P.O Box 41512-Nairobi,Kenya</p>
            <p className= " capitalize font-[Times-New-Roman] text-[13px] font-bold border border-black text-black">Authorized by hr officer</p>
            <h4 className="text-black uppercase font-[Roboto] text-[9px] font-light  border-b-gray border-b-2">Date</h4>
            <h4 className="text-black uppercasefont-[Roboto] text-[9px] font-light flex items-center border-b-gray border-b-2">Sign</h4>
          </div>
          <div className="logo">
            <Image
              src="/Images/logo/hrlogo.png"
              alt="logo"
              width={80}
              height={80}
              className="h-[86px] w-[89px]"
            />
          </div>
        </div>
        <div className="uppercase text-center text-green-600 bg-blue-900  font-[Roboto] text-[16px] h-[22px] ">CLIENT:SUKARI INDUSTRIES LIMITED</div>
      </div>
    </section>
    </>
  );
}
