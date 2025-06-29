import { forwardRef, useRef, useState } from "react";

import { IoIosClose } from "react-icons/io";
import { getAuthToken } from "../../util/auth";
const Editformvol = forwardRef(function Editformvol(
  {
    title,
    id,
    description,

    image,
    benefits,
    endDate,

    location,

    requiredAge,
    seatsAvailable,
    startDate,
    setOrganizationData,
    tasks,
    key,
    type,
    photoUrl,
  },
  ref
) {
  console.log(title);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editeddata, setEditeddata] = useState({
    id,
    title,
    description,
    tasks,
    startDate,
    endDate,
    seatsAvailable,
    location,
    benefits,
    requiredAge,
    type,
    image: photoUrl,
  });
  const initialDataRef = useRef({ ...editeddata });
  const handleClose = () => {
    setEditeddata(initialDataRef.current);
    ref.current.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const newErrors = {};
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("Title", editeddata.title);
    formData.append("Description", editeddata.description);
    formData.append("Tasks", editeddata.tasks);
    formData.append("StartDate", editeddata.startDate);
    formData.append("EndDate", editeddata.endDate);
    formData.append("SeatsAvailable", editeddata.seatsAvailable);
    formData.append("Location", editeddata.location);
    formData.append("Benefits", editeddata.benefits);
    formData.append("RequiredAge", editeddata.requiredAge);
    formData.append("Type", editeddata.type);
    console.log("🧾 Tasks being sent:", editeddata.tasks);
    if (editeddata.image instanceof File) {
      formData.append("Image", editeddata.image);
    }
    const requiredFields = [
      "title",
      "description",
      "tasks",
      "startDate",
      "endDate",
      "seatsAvailable",
      "location",
      "benefits",
      "requiredAge",
      "type",
    ];

    requiredFields.forEach((field) => {
      if (!editeddata[field] || editeddata[field].toString().trim() === "") {
        newErrors[field] = "هذا الحقل مطلوب";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setFieldErrors({}); // لو مفيش أخطاء، امسح القديم

    try {
      const token = getAuthToken();
      console.log(token);
      const response = await fetch(`/api/Opportunities/${editeddata.id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        const message = data?.message || "حدث خطأ أثناء تعديل الفرصة.";
        setErrorMessage(message);
        setIsSubmitting(false);
        return;
      }

      // تحديث البيانات محليًا بعد النجاح
      setOrganizationData((prev) => {
        const newVolData = [...prev.volData];
        const index = newVolData.findIndex((item) => item.id === editeddata.id);

        if (index !== -1) {
          newVolData[index] = {
            ...editeddata,
            photoUrl:
              editeddata.image instanceof File
                ? URL.createObjectURL(editeddata.image)
                : editeddata.image,
          };
        }

        return {
          ...prev,
          volData: newVolData,
        };
      });

      ref.current.close();
    } catch (error) {
      console.error("فشل التعديل:", error.message);
      setErrorMessage("فشل الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false); // <-- انهى التعديل
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditeddata((prev) => ({ ...prev, image: file }));
    }
  };
  const className =
    "flex h-10 w-[90%] text-right rounded-md border border-input bg-background px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none     md:text-sm";

  return (
    <dialog
      ref={ref}
      className="editedform absolute top-0  xl:w-[700px] lg:w-[600px] text-[#214570] md:w-[500px] focus:border-0 focus:outline-0    custom-scrollbar"
    >
      <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-blue-900 pr-5">تعديل الفرصة</h2>
          <button onClick={handleClose}>
            <IoIosClose className="text-3xl" />
          </button>
        </div>
        {[
          { label: "العنوان", key: "title" },
          { label: "الوصف", key: "description" },
          { label: "المهام", key: "tasks" },
          { label: "الموقع", key: "location" },
          { label: "الفوائد", key: "benefits" },
          { label: "نوع الفرصة", key: "type" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-blue-900">{label}</label>
            <input
              className={className}
              value={editeddata[key] || ""}
              onChange={(e) =>
                setEditeddata({ ...editeddata, [key]: e.target.value })
              }
            />
            {fieldErrors[key] && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors[key]}</p>
            )}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900">تاريخ البدء</label>
            <input
              type="date"
              className={className}
              value={editeddata.startDate}
              onChange={(e) =>
                setEditeddata({ ...editeddata, startDate: e.target.value })
              }
            />
            {fieldErrors[key] && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors[key]}</p>
            )}
          </div>
          <div>
            <label className="block text-blue-900">تاريخ الانتهاء</label>
            <input
              type="date"
              className={className}
              value={editeddata.endDate}
              onChange={(e) =>
                setEditeddata({ ...editeddata, endDate: e.target.value })
              }
            />
            {fieldErrors[key] && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors[key]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900">عدد المقاعد المتاحة</label>
            <input
              type="number"
              className={className}
              value={editeddata.seatsAvailable}
              onChange={(e) =>
                setEditeddata({
                  ...editeddata,
                  seatsAvailable: parseInt(e.target.value),
                })
              }
            />
          </div>
          {fieldErrors[key] && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors[key]}</p>
          )}
          <div>
            <label className="block text-blue-900">العمر المطلوب</label>
            <input
              type="number"
              className={className}
              value={editeddata.requiredAge}
              onChange={(e) =>
                setEditeddata({
                  ...editeddata,
                  requiredAge: parseInt(e.target.value),
                })
              }
            />
          </div>
          {fieldErrors[key] && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors[key]}</p>
          )}
        </div>

        <div>
          <label className="block text-blue-900">رفع صورة</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* <div className="space-y-2">
          <label htmlFor="title" className="block text-right text-blue-900">
            وصف الفرصة
          </label>
          <input
            id="title"
            name="title"
            value={editeddata.title}
            onChange={(e) =>
              setEditeddata({ ...editeddata, title: e.target.value })
            }
            className={className}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="number" className="block text-right text-blue-900">
            رقم الهاتف
          </label>
          <input
            id="number"
            name="number"
            value={editeddata.number}
            onChange={(e) =>
              setEditeddata({ ...editeddata, number: e.target.value })
            }
            placeholder="رقم الهاتف"
            className={className}
            type="tel"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="place" className="block text-right text-blue-900">
            المكان
          </label>
          <input
            id="place"
            name="place"
            value={editeddata.place}
            onChange={(e) =>
              setEditeddata({ ...editeddata, place: e.target.value })
            }
            placeholder="أدخل العنوان (مدينة، حي، شارع)"
            className={className}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="targetprice"
            className="block text-right text-blue-900"
          >
            المبلغ المستهدف
          </label>
          <input
            id="targetprice"
            name="targetprice"
            value={editeddata.targetprice}
            onChange={(e) =>
              setEditeddata({ ...editeddata, targetprice: e.target.value })
            }
            className={className}
            type="number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pricenow" className="block text-right text-blue-900">
            المبلغ حتى الآن
          </label>
          <input
            id="pricenow"
            name="pricenow"
            value={editeddata.pricenow}
            onChange={(e) =>
              setEditeddata({ ...editeddata, pricenow: e.target.value })
            }
            className={className}
            type="number"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-blue-900 hover:shadow-xl hover:gb-[#eee] cursor-pointer w-[150px] border-1 py-1 text-md  rounded-sm text-center "
          >
            رفع صوره الفرصه
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[40%] py-2 rounded-sm text-lg  bg-[#0D8F75] hover:bg-emerald-700 text-white"
          >
            {isSubmitting ? "جاري التعديل..." : "تعديل"}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-600 text-center mt-2">{errorMessage}</p>
        )}
      </form>
    </dialog>
  );
});
export default Editformvol;
