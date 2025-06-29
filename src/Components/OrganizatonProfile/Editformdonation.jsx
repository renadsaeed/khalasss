import { forwardRef, useRef, useState, useEffect } from "react";

import { IoIosClose } from "react-icons/io";
import { getAuthToken } from "../../util/auth";
const Editform = forwardRef(function Editform(
  {
    title,

    imageUrl,
    setOrganizationData,
    id,
  },
  ref
) {
  const [editeddata, setEditeddata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialDataRef = useRef(null);
  const token = getAuthToken();

  useEffect(() => {
    if (!id) return;

    fetch(`/api/DonationOpportunity/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from server:", data);
        const formattedData = {
          id: data.id,
          title: data.title || "",
          description: data.description || "",
          place: data.place || "",
          number: data.number || "",
          pricenow: data.collectedAmount || 0, // ← هنا
          targetprice: data.remainingAmount || 0, // ← وهنا
          image: data.imageUrl,
        };
        setEditeddata(formattedData);

        initialDataRef.current = formattedData;
      })
      .catch((err) => {
        console.error("خطأ في جلب بيانات التبرع:", err);
      });
  }, [id]);

  function handelClose(e) {
    e.preventDefault();
    if (initialDataRef.current) {
      setEditeddata(initialDataRef.current);
    }
    ref.current.close();
  }

  async function handelsubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("Id", editeddata.id);
    formData.append("Title", editeddata.title);
    formData.append("Description", editeddata.description);
    formData.append("TargetAmount", Number(editeddata.targetprice));
    formData.append("CollectedAmount", Number(editeddata.pricenow));
    formData.append("Deadline", new Date().toISOString());
    if (editeddata.image instanceof File) {
      formData.append("Image", editeddata.image);
    } else if (typeof editeddata.image === "string") {
      try {
        const imageUrl = editeddata.image;
        const filename = imageUrl.split("/").pop().split("?")[0];
        const blob = await fetch(imageUrl).then((r) => r.blob());
        const file = new File([blob], filename, { type: blob.type });
        formData.append("Image", file); // ← الصورة القديمة كـ File
      } catch (err) {
        console.error("فشل تحميل الصورة:", err);
        setErrorMessage("حدث خطأ أثناء تحميل الصورة القديمة.");
        setLoading(false);
        return;
      }
    }

    // const imageInput = document.getElementById("image");

    // if (imageInput.files.length > 0) {
    //   formData.append("Image", imageInput.files[0]); // ✅ صورة جديدة
    // } else if (imageUrl) {
    //   try {
    //     const filename = imageUrl.split("/").pop();
    //     const blob = await fetch(imageUrl).then((r) => r.blob());
    //     const file = new File([blob], filename, { type: blob.type });
    //     formData.append("Image", file); // ✅ صورة قديمة من props
    //   } catch (error) {
    //     console.error("فشل تحميل الصورة القديمة:", error);
    //     setErrorMessage("حدث خطأ أثناء تحميل الصورة القديمة.");
    //     setLoading(false);
    //     return;
    //   }
    // } else {
    //   setErrorMessage("الصورة مطلوبة. الرجاء رفع صورة.");
    //   setLoading(false);
    //   return;
    // }

    console.log("formData keys:", [...formData.keys()]);
    console.log("hello");
    // for (let pair of formData.entries()) {
    //   console.log("filed");
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // for (let pair of formData.entries()) {
    //   console.log("filed");
    //   if (pair[1] instanceof File) {
    //     console.log(pair[0] + ": ملف - " + pair[1].name);
    //   } else {
    //     console.log(pair[0] + ": " + pair[1]);
    //   }
    // }

    // fetch(`/api/DonationOpportunity/${editeddata.id}`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${token}`, // ✅ مهم جدًا
    //   },
    //   body: formData,
    // })
    //   .then(async (res) => {
    //     const contentType = res.headers.get("content-type");

    //     if (!res.ok) {
    //       const errorText = await res.text();
    //       throw new Error(
    //         errorText || `فشل في التحديث (status: ${res.status})`
    //       );
    //     }

    //     // ✅ الحالة الأولى: رد JSON
    //     if (contentType?.includes("application/json")) {
    //       return res.json();
    //     }

    //     // ✅ الحالة الثانية: رد نصي ناجح
    //     const text = await res.text();
    //     if (text?.toLowerCase().includes("success")) {
    //       return { message: text }; // ← نمثلها كـ JSON يدويًا
    //     }

    //     throw new Error(text || "الرد من السيرفر ليس JSON.");
    //   })
    //   .then((updatedData) => {
    //     // ✅ فقط حدّث البيانات لو معاك فعلاً object فيه id (يعني الرد كان JSON)
    //     // if (updatedData && updatedData.id) {
    //     //   setOrganizationData((prevData) => {
    //     //     const newData = { ...prevData.donData };
    //     //     const index = newData.data.findIndex(
    //     //       (item) => item.id === updatedData.id
    //     //     );
    //     //     if (index !== -1) {
    //     //       newData.data[index] = {
    //     //         ...newData.data[index],
    //     //         title: updatedData.title,
    //     //         description: updatedData.description,
    //     //         collectedAmount: updatedData.collectedAmount,
    //     //         remainingAmount: updatedData.remainingAmount,
    //     //         imageUrl: updatedData.imageUrl,
    //     //       };
    //     //     }
    //     //     return newData;
    //     //   });
    //     // }
    //        setOrganizationData((prev) => {
    //     const newdonData = [...prev.donData];
    //     const index = newdonData.findIndex((item) => item.id === editeddata.id);

    //     if (index !== -1) {
    //       newdonData[index] = {
    //         ...editeddata,
    //         photoUrl:
    //           editeddata.image instanceof File
    //             ? URL.createObjectURL(editeddata.image)
    //             : editeddata.image,
    //       };
    //     }

    //     return {
    //       ...prev,
    //       donData: newdonData,
    //     };
    //   });

    //     // ✅ بغض النظر عن نوع الرد، طالما العملية نجحت:
    //     setSuccessMessage("تم التعديل بنجاح");
    //     setTimeout(() => {
    //       setSuccessMessage("");
    //       ref.current.close();
    //     }, 1500);
    //   })

    //   .catch((err) => {
    //     console.error("تفاصيل الخطأ:", err);
    //     setErrorMessage(" حدث خطأ أثناء التعديل. حاول مرة أخرى.");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    try {
      const token = getAuthToken();
      console.log(token);
      const response = await fetch(
        `/api/DonationOpportunity/${editeddata.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        const message = data?.message || "حدث خطأ أثناء تعديل الفرصة.";
        setErrorMessage(message);
        setIsSubmitting(false);
        return;
      }

      // تحديث البيانات محليًا بعد النجاح
      setOrganizationData((prev) => {
        const newdonData = [...prev.donData];
        const index = newdonData.findIndex((item) => item.id === editeddata.id);

        if (index !== -1) {
          newdonData[index] = {
            ...editeddata,
            imageUrl:
              editeddata.image instanceof File
                ? URL.createObjectURL(editeddata.image)
                : editeddata.image,
          };
        }

        return {
          ...prev,
          donData: newdonData,
        };
      });

      ref.current.close();
    } catch (error) {
      console.error("فشل التعديل:", error.message);
      setErrorMessage("فشل الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false); // <-- انهى التعديل
    }
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditeddata((prev) => ({ ...prev, image: file }));
    }
  };
  if (!editeddata) {
    return (
      <dialog
        ref={ref}
        className="editedform xl:w-[700px] lg:w-[600px] text-[#214570] md:w-[500px] focus:border-0 focus:outline-0 custom-scrollbar"
      >
        <div className="p-6 text-center text-blue-900">
          جارٍ تحميل البيانات...
        </div>
      </dialog>
    );
  }
  const className =
    "flex h-10 w-[90%] text-right rounded-md border border-input bg-background px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none     md:text-sm";

  return (
    <dialog
      ref={ref}
      className="editedform xl:w-[700px] lg:w-[600px] text-[#214570] md:w-[500px] focus:border-0 focus:outline-0    custom-scrollbar"
    >
      <form onSubmit={handelsubmit} className="space-y-4" dir="rtl">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-blue-900 pr-5">تعديل الفرصة</h2>
          <button onClick={handelClose}>
            <IoIosClose className="text-3xl" />
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-right text-blue-900">
            العنوان
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
          <label
            htmlFor="description"
            className="block text-right text-blue-900"
          >
            وصف الفرصة
          </label>
          <input
            id="description"
            name="description"
            value={editeddata.description}
            onChange={(e) =>
              setEditeddata({ ...editeddata, description: e.target.value })
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
        <div>
          <label className="block text-blue-900">رفع صورة</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-[40%] py-2 rounded-sm text-lg  bg-[#0D8F75] hover:bg-emerald-700 text-white"
          >
            {loading ? "جارٍ التعديل..." : "تعديل"}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-600 text-center font-medium mt-2">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="text-green-600 text-center font-medium mt-2">
            {successMessage}
          </p>
        )}
      </form>
    </dialog>
  );
});
export default Editform;
