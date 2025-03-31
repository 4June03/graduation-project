import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface InputFormProps {
  nameValue: string;
  label: string;
  type: string;
  placeholder: string;
  field: any;
  className?: string;
}

const InputForm: React.FC<InputFormProps> = ({
  nameValue,
  label,
  type,
  placeholder,
  field,
  className,
}) => {
  return (
    <>
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              name={nameValue}
              type={type}
              id={nameValue}
              placeholder={placeholder}
              className={className}
              {...field}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};

export default InputForm;
