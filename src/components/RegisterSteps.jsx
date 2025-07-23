import { FaUsers, FaEdit, FaCheckCircle} from "react-icons/fa";

export default function RegisterSteps() {
     const steps= [
        {
            icon:<FaUsers className="text-[#475B06] text-3xl animate-bounce"/>,
            title:"Create a Chama Account",
            desc:"Start by registering your chama's basic details including name, members and admin contact.",

        },
        {
            icon:<FaEdit className="text-[#475B06] text-3xl animate-pulse"/>,
            title: "Verify and Set Rules",
            desc:"Define how your group will operate- savingss,frequency,contribution limits, goals,etc."
        },
        {
            icon:<FaCheckCircle className="text-[#475B06] text-3xl animate-bounce"/>,
            title: "Start Saving",
            desc:"Members can now start contributing, track goals and manage savings in one place."
        },
     ];
    return(
        <section className="bg-white py-16 px-6 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-12">Steps to Register Your Chama and Start Saving</h2>
            <div className="relative border-l-4 border-yellow-400 pl-6 space-y-12">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-6 group">
                        <div className="bg-white shadow-lg rounded-full p-4 border border-yellow-400">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#475B06] group-hover:underline transition duration-300">
                            {step.title}
                            </h3>
                            <p className="text-gray-600 mt-2">{step.desc}</p>
                        </div>
                    </div>
                    
                ))}
            </div>
        </section>
    );
}