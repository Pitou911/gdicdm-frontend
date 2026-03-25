export default function CmsDashboard(){
    return (
        <div id="cms-dashboard">
            <div className="font-display text-[28px] font-bold text-text mb-1 tracking-[-0.3px]">
                Dashboard
            </div>
            <div className="text-[13px] text-text-3 mb-6">
                Overview of all content - investor.mef.gov.kh
            </div>
            <div className="grid grid-cols-4 gap-3.5 mb-6">
                <div className="bg-white border border-light-2 rounded-sm p-5 shadow-sm">
                    <div className="font-display text-[34px] font-bold text-text leading-none mb-1 tracking-[-0.5px]">156</div>
                    <div className="text-[12px] font-medium text-text-3">Total Resources</div>
                    <div className="font-mono text-[10.5px] text-green-2 mt-1">↑ +4 this month</div>
                </div>

                <div className="bg-white border border-light-2 rounded-sm p-5 shadow-sm">
                    <div className="font-display text-[34px] font-bold text-text leading-none mb-1 tracking-[-0.5px]">12</div>
                    <div className="text-[12px] font-medium text-text-3">Published News</div>
                    <div className="font-mono text-[10.5px] text-green-2 mt-1">↑ +1 this week</div>
                </div>
                <div className="bg-white border border-light-2 rounded-sm p-5 shadow-sm">
                    <div className="font-display text-[34px] font-bold text-text leading-none mb-1 tracking-[-0.5px]">3,840</div>
                    <div className="text-[12px] font-medium text-text-3">Total Downloads</div>
                    <div className="font-mono text-[10.5px] text-green-2 mt-1">↑ +240 this month</div>
                </div>
                <div className="bg-white border border-light-2 rounded-sm p-5 shadow-sm">
                    <div className="font-display text-[34px] font-bold text-text leading-none mb-1 tracking-[-0.5px]">2</div>
                    <div className="text-[12px] font-medium text-text-3">Drafts Pending</div>
                    <div className="font-mono text-[10.5px] text-amber mt-1">Needs review</div>
                </div>

            </div>
            <div className="text-[11px] font-bold tracking-[1px] uppercase text-text-3 mb-2.5">
                Recent Uploads
            </div>
            <table className="w-full border-collapse bg-white rounded-sm overflow-hidden shadow-sm border border-light-2">
                <thead>
                    <tr>
                        {['Title','Type','Section','Language','Status','Date','Actions'].map(h => (
                            <th key={h} className="bg-snow text-text-3 px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[1px] uppercase border-b border-light-2">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="group">
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <strong>Cambodia Public Debt Bulletin Q3 2024</strong>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">PDF</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">Documents</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">EN + KH</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Published</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">20 Oct 2024</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            {/* cms-acts */}
                            <div className="flex gap-1.25 items-center">
                                {/* cbtn */}
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                {/* cbtn cbtn-del */}
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-amber hover:text-amber">Delete</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="group">
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <strong>Bond Series 6 Prospectus 2025</strong>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">PDF</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">Bond Info</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">EN</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.5 py-1.25 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Published</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">15 Jan 2025</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <div className="flex gap-1.25 items-center">
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-amber hover:text-amber">Delete</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="group">
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <strong>Intro to Govt Bonds — Khmer Video</strong>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">VIDEO</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">Education</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">KH</td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-blue-3 text-blue-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-blue-2">Draft</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">10 Jan 2025</span>
                        </td>
                        <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                            <div className="flex gap-1.25 items-center">
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-green-2 bg-transparent cursor-pointer text-green-2 rounded-[6px] transition-all duration-150 hover:bg-green-2 hover:text-white">Publish</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="group">
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">
                            <strong>Debt Portfolio Infographic 2024</strong>
                        </td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">IMG</span>
                        </td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">Education</td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">Both</td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.5 py-1.25 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Published</span>
                        </td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">
                            <span className="font-mono text-[11px] text-text-3">5 Jan 2025</span>
                        </td>
                        <td className="px-3.5 py-2.75 text-[13px] text-text align-middle group-hover:bg-snow">
                            <div className="flex gap-1.25 items-center">
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                <button className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-amber hover:text-amber">Delete</button>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}