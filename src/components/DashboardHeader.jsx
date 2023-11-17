import Title from "@/components/Title";
import Filters from "@/components/Filters";

export default function DashboardHeader() {
  return (
    <div className='flex justify-between items-center mb-4'>
      <Title text="Dashboard" />
      <Filters
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" }
        ]}
      />
    </div>
  )
}
