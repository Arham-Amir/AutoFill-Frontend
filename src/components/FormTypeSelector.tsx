import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FormTypeSelectorProps {
    selectedType: string;
    onTypeSelect: (type: string) => void;
}

const FormTypeSelector: React.FC<FormTypeSelectorProps> = ({ selectedType, onTypeSelect }) => {
    return (
        <div className="">
            <Select onValueChange={(value) => onTypeSelect(value)} defaultValue={selectedType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Form Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Form Type</SelectLabel>
                        <SelectItem value="avivaontario">avivaontario</SelectItem>
                        <SelectItem value="avivaalberta">avivaalberta</SelectItem>
                        <SelectItem value="avivaatlantic">avivaatlantic</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

    );

};

export default FormTypeSelector;